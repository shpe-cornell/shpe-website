import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { applyApiGuards, handleOptions } from "@/lib/api-guards";
import { isValidEmail, sanitizeText } from "@/lib/validation";

type EventRecord = {
  id: number;
  name: string;
  date: string;
  points_value: number;
  is_open: boolean;
  google_form_url: string | null;
  school_year: string;
};

type MemberRecord = {
  id: number;
  first_name: string;
  last_name: string;
};

type CheckinBody = {
  eventId?: string;
  netId?: string;
  firstName?: string;
  lastName?: string;
  major?: string;
  gradYear?: string;
  gradSemester?: string;
  personalEmail?: string;
};

const netIdPattern = /^[a-z0-9]+$/;

export const OPTIONS = (request: NextRequest) => handleOptions(request);

async function markAttendance(memberId: number, eventId: string) {
  const { data: settings } = await supabaseServer
    .from("settings")
    .select("active_year")
    .single();

  const { error } = await supabaseServer.from("attendance").insert({
    member_id: memberId,
    event_id: eventId,
    school_year: settings?.active_year ?? "2025-2026",
  });

  if (error) throw error;
}

async function markOrReturnAlready(
  member: MemberRecord,
  eventId: string,
  headers?: HeadersInit,
) {
  const { data: existingAttendance } = await supabaseServer
    .from("attendance")
    .select("id")
    .eq("member_id", member.id)
    .eq("event_id", eventId)
    .maybeSingle();

  if (existingAttendance) {
    return NextResponse.json({ status: "already", member }, { headers });
  }

  try {
    await markAttendance(member.id, eventId);
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;

    if (code === "23505") {
      return NextResponse.json({ status: "already", member }, { headers });
    }

    return NextResponse.json(
      { error: "Could not complete check-in. Please try again." },
      { status: 500, headers },
    );
  }

  return NextResponse.json({ status: "success", member }, { headers });
}

export async function GET(request: NextRequest) {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;

  const eventId = request.nextUrl.searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId." }, { status: 400, headers: guard.headers });
  }

  const { data: event, error } = await supabaseServer
    .from("events")
    .select("id, name, date, points_value, is_open, google_form_url, school_year")
    .eq("id", eventId)
    .single<EventRecord>();

  if (error || !event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404, headers: guard.headers });
  }

  return NextResponse.json({ event }, { headers: guard.headers });
}

export async function POST(request: NextRequest) {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;

  let body: CheckinBody;

  try {
    body = (await request.json()) as CheckinBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: guard.headers });
  }

  const eventId = body.eventId?.trim();
  const normalizedNetId = body.netId?.trim().toLowerCase();

  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId." }, { status: 400, headers: guard.headers });
  }

  if (!normalizedNetId || !netIdPattern.test(normalizedNetId)) {
    return NextResponse.json(
      { error: "Net ID format looks incorrect. Expected format: abc123" },
      { status: 400, headers: guard.headers },
    );
  }

  const { data: event, error: eventError } = await supabaseServer
    .from("events")
    .select("id, is_open")
    .eq("id", eventId)
    .single<{ id: number; is_open: boolean }>();

  if (eventError || !event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404, headers: guard.headers });
  }

  if (!event.is_open) {
    return NextResponse.json({ error: "Check-in is closed for this event." }, { status: 400, headers: guard.headers });
  }

  const { data: existingMember } = await supabaseServer
    .from("members")
    .select("id, first_name, last_name")
    .eq("net_id", normalizedNetId)
    .maybeSingle<MemberRecord>();

  if (existingMember) {
    return markOrReturnAlready(existingMember, eventId, guard.headers);
  }

  const firstName = sanitizeText(body.firstName ?? "");
  const lastName = sanitizeText(body.lastName ?? "");
  const major = sanitizeText(body.major ?? "");
  const gradSemester = sanitizeText(body.gradSemester ?? "");
  const gradYear = Number.parseInt(body.gradYear ?? "", 10);
  const normalizedPersonalEmail = sanitizeText(body.personalEmail ?? "").toLowerCase();

  const hasSignupData =
    !!firstName &&
    !!lastName &&
    !!major &&
    !!gradSemester &&
    Number.isInteger(gradYear);

  if (!hasSignupData) {
    return NextResponse.json({ status: "signup_required" }, { headers: guard.headers });
  }

  if (gradYear < 1865 || gradYear > 2035) {
    return NextResponse.json(
      { error: "Please enter a valid graduation year" },
      { status: 400, headers: guard.headers },
    );
  }

  if (gradSemester !== "Spring" && gradSemester !== "Fall") {
    return NextResponse.json(
      { error: "Please select a valid graduation semester." },
      { status: 400, headers: guard.headers },
    );
  }

  if (normalizedPersonalEmail && !isValidEmail(normalizedPersonalEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid personal email." },
      { status: 400, headers: guard.headers },
    );
  }

  const insertPayload: {
    net_id: string;
    first_name: string;
    last_name: string;
    major: string;
    graduation_year: number;
    graduation_semester: string;
    member_type: "student";
    personal_email?: string;
  } = {
    net_id: normalizedNetId,
    first_name: firstName,
    last_name: lastName,
    major,
    graduation_year: gradYear,
    graduation_semester: gradSemester,
    member_type: "student",
  };

  if (normalizedPersonalEmail) {
    insertPayload.personal_email = normalizedPersonalEmail;
  }

  const { data: createdMember, error: createError } = await supabaseServer
    .from("members")
    .insert(insertPayload)
    .select("id, first_name, last_name")
    .single<MemberRecord>();

  if (createError || !createdMember) {
    if (createError?.code === "23505") {
      const { data: memberAfterConflict } = await supabaseServer
        .from("members")
        .select("id, first_name, last_name")
        .eq("net_id", normalizedNetId)
        .maybeSingle<MemberRecord>();

      if (memberAfterConflict) {
        return markOrReturnAlready(memberAfterConflict, eventId, guard.headers);
      }
    }

    return NextResponse.json(
      { error: "Something went wrong creating your account. Please try again." },
      { status: 500, headers: guard.headers },
    );
  }

  return markOrReturnAlready(createdMember, eventId, guard.headers);
}
