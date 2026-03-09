import CheckInPageClient from "./checkin-page-client";

// Temporary static-export guard:
// While we deploy via FileZilla (`output: "export"`), we skip generating
// dynamic `/checkin/[eventId]` paths. Keep this route for Vercel migration.
export const dynamicParams = false;

export async function generateStaticParams() {
  // Next.js static export currently requires at least one concrete param entry
  // for dynamic segments. We use a placeholder path temporarily for FileZilla.
  // Remove this workaround when moving to Vercel dynamic hosting.
  return [{ eventId: "__static-export-placeholder__" }];
}

export default function CheckInPage() {
  return <CheckInPageClient />;
}
