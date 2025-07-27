import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json", 
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const netid = url.searchParams.get("netid");

    if (!netid) {
      return NextResponse.json({ error: "No NetID provided" }, { status: 400 });
    }

    const spreadsheetId = "1MUc2QSEzI_EgW902LdGu1i4RMR6a14p-03Q0hrHBpL8";
    const range = "Points Tracker!A2:D";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    // Find row with NetID match
    const userRow = rows.find(
      (row) => row[0]?.toLowerCase() === netid.toLowerCase()
    );

    if (!userRow) {
      return NextResponse.json(
        { error: "NetID not found" },
        { status: 404 }
      );
    }

    // Return matched row as JSON
    return NextResponse.json({
      netid: userRow[0],
      name: userRow[1],
      points: userRow[2],
      eventsAttended: userRow[3],
    });
  } catch (error) {
    console.error("Google Sheets API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
