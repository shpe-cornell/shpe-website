import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { applyApiGuards, handleOptions } from "@/lib/api-guards";

export const OPTIONS = (request: NextRequest) => handleOptions(request);

export async function GET(request: NextRequest) {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;

  const { data: settings, error: settingsError } = await supabaseServer
    .from("settings")
    .select("active_year")
    .single<{ active_year: string }>();

  if (settingsError || !settings?.active_year) {
    return NextResponse.json({ error: "Could not fetch points right now." }, { status: 500, headers: guard.headers });
  }

  // Fetch all members with their attendance
  const { data: members, error: membersError } = await supabaseServer
    .from("members")
    .select("id, first_name, last_name, net_id")
    .order("last_name");

  if (membersError) {
    return NextResponse.json({ error: "Could not fetch members." }, { status: 500, headers: guard.headers });
  }

  // For each member, calculate total points
  const membersWithPoints = await Promise.all(
    (members ?? []).map(async (member) => {
      const { data: attendanceRows, error: attendanceError } = await supabaseServer
        .from("attendance")
        .select("events(points_value)")
        .eq("member_id", member.id)
        .eq("school_year", settings.active_year);

      if (attendanceError) {
        console.error(`Error fetching attendance for ${member.id}:`, attendanceError);
        return {
          name: `${member.first_name} ${member.last_name}`,
          netId: member.net_id,
          points: 0,
        };
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

      return {
        name: `${member.first_name} ${member.last_name}`,
        netId: member.net_id,
        points: totalPoints,
      };
    })
  );

  // Sort by points descending
  membersWithPoints.sort((a, b) => b.points - a.points);

  return NextResponse.json({
    status: "success",
    members: membersWithPoints,
  }, { headers: guard.headers });
}