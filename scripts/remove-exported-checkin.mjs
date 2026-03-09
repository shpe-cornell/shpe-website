import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Temporary static-export cleanup for FileZilla hosting.
// Keep /checkin/[eventId] source route for Vercel migration, but remove
// exported static checkin pages from /out for now.
const exportedCheckinDir = resolve(process.cwd(), "out", "checkin");

if (existsSync(exportedCheckinDir)) {
  rmSync(exportedCheckinDir, { recursive: true, force: true });
  console.log("Removed static-exported checkin routes from /out.");
}
