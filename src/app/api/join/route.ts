import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { applyApiGuards, handleOptions } from "@/lib/api-guards";
import { isValidEmail, sanitizeText } from "@/lib/validation";

type JoinBody = {
  netId?: string;
  firstName?: string;
  lastName?: string;
  graduationYear?: string;
  graduationSemester?: string;
  major?: string;
  personalEmail?: string;
};

const netIdPattern = /^[a-z0-9]+$/;

export const OPTIONS = (request: NextRequest) => handleOptions(request);

export async function POST(request: NextRequest) {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;

  let body: JoinBody;

  try {
    body = (await request.json()) as JoinBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: guard.headers });
  }

  const normalizedNetId = sanitizeText(body.netId ?? "").toLowerCase();
  const firstName = sanitizeText(body.firstName ?? "");
  const lastName = sanitizeText(body.lastName ?? "");
  const major = sanitizeText(body.major ?? "");
  const graduationSemester = sanitizeText(body.graduationSemester ?? "");
  const graduationYear = Number.parseInt(body.graduationYear ?? "", 10);
  const personalEmail = sanitizeText(body.personalEmail ?? "").toLowerCase();

  if (!normalizedNetId || !netIdPattern.test(normalizedNetId)) {
    return NextResponse.json(
      { error: "Net ID format looks incorrect. Expected format: abc123" },
      { status: 400, headers: guard.headers },
    );
  }

  if (!firstName || !lastName || !major) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400, headers: guard.headers });
  }

  if (!Number.isInteger(graduationYear) || graduationYear < 2000 || graduationYear > 2100) {
    return NextResponse.json({ error: "Please enter a valid graduation year." }, { status: 400, headers: guard.headers });
  }

  if (graduationSemester !== "Spring" && graduationSemester !== "Fall") {
    return NextResponse.json(
      { error: "Please select a valid graduation semester." },
      { status: 400, headers: guard.headers },
    );
  }

  if (personalEmail && !isValidEmail(personalEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid personal email." },
      { status: 400, headers: guard.headers },
    );
  }

  const { data: existingMember, error: existingError } = await supabaseServer
    .from("members")
    .select("id, first_name")
    .eq("net_id", normalizedNetId)
    .maybeSingle<{ id: number; first_name: string | null }>();

  if (existingError) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500, headers: guard.headers });
  }

  if (existingMember) {
    return NextResponse.json({
      status: "already",
      firstName: existingMember.first_name ?? firstName,
    }, { headers: guard.headers });
  }

  const payload: {
    net_id: string;
    first_name: string;
    last_name: string;
    graduation_year: number;
    graduation_semester: string;
    major: string;
    member_type: "student";
    personal_email?: string;
  } = {
    net_id: normalizedNetId,
    first_name: firstName,
    last_name: lastName,
    graduation_year: graduationYear,
    graduation_semester: graduationSemester,
    major,
    member_type: "student",
  };

  if (personalEmail) {
    payload.personal_email = personalEmail;
  }

  const { data: createdMember, error: insertError } = await supabaseServer
    .from("members")
    .insert(payload)
    .select("first_name")
    .single<{ first_name: string | null }>();

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ status: "already", firstName }, { headers: guard.headers });
    }

    return NextResponse.json(
      { error: "Something went wrong creating your account. Please try again." },
      { status: 500, headers: guard.headers },
    );
  }

  return NextResponse.json({ status: "success", firstName: createdMember?.first_name ?? firstName }, { headers: guard.headers });
}
