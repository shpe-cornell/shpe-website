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
    const range = "Points Tracker!A2:C"; // only NetID, Name, Points

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      majorDimension: "COLUMNS",
    });

    const cols = response.data.values || [];
    const netids = cols[0] || [];
    const names = cols[1] || [];
    const points = cols[2] || [];

    // Find index of matching NetID
    const index = netids.findIndex(id => id?.toLowerCase() === netid.toLowerCase());

    if (index === -1) {
      return NextResponse.json({ error: "NetID not found" }, { status: 404 });
    }

    return NextResponse.json({
      netid: netids[index],
      name: names[index],
      points: points[index],
    });
  } catch (error) {
    console.error("Google Sheets API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
