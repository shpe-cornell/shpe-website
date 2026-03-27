import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { applyApiGuards, handleOptions } from "@/lib/api-guards";

type PointsBody = {
  netId?: string;
};

const netIdPattern = /^[a-z0-9]+$/;

export const OPTIONS = (request: NextRequest) => handleOptions(request);

export async function POST(request: NextRequest) {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;

  let body: PointsBody;

  try {
    body = (await request.json()) as PointsBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: guard.headers });
  }

  const netId = body.netId?.trim().toLowerCase();

  if (!netId || !netIdPattern.test(netId)) {
    return NextResponse.json({ status: "not_found" }, { headers: guard.headers });
  }

  const { data: settings, error: settingsError } = await supabaseServer
    .from("settings")
    .select("active_year")
    .single<{ active_year: string }>();

  if (settingsError || !settings?.active_year) {
    return NextResponse.json({ error: "Could not fetch points right now." }, { status: 500, headers: guard.headers });
  }

  const { data: member, error: memberError } = await supabaseServer
    .from("members")
    .select("id, first_name, last_name")
    .eq("net_id", netId)
    .maybeSingle<{ id: number; first_name: string; last_name: string }>();

  if (memberError) {
    return NextResponse.json({ error: "Could not fetch points right now." }, { status: 500, headers: guard.headers });
  }

  if (!member) {
    return NextResponse.json({ status: "not_found" }, { headers: guard.headers });
  }

  const { data: attendanceRows, error: attendanceError } = await supabaseServer
    .from("attendance")
    .select("events(points_value)")
    .eq("member_id", member.id)
    .eq("school_year", settings.active_year);

  if (attendanceError) {
    return NextResponse.json({ error: "Could not fetch points right now." }, { status: 500, headers: guard.headers });
  }

  const totalPoints = (attendanceRows ?? []).reduce((sum, row) => {
    const eventData = row.events as
      | { points_value: number }
      | { points_value: number }[]
      | null;
    const eventPoints = Array.isArray(eventData)
      ? (eventData[0]?.points_value ?? 0)
      : (eventData?.points_value ?? 0);
    return sum + eventPoints;
  }, 0);

  return NextResponse.json({
    status: "success",
    name: `${member.first_name} ${member.last_name}`,
    totalPoints,
  }, { headers: guard.headers });
}
