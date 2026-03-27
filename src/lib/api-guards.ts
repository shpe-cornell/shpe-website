import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit } from "./rate-limit";

const allowedOrigins = new Set([
  "https://shpe.cornell.edu",
  "https://www.shpe.cornell.edu",
  "http://localhost:3000",
]);

type GuardResult = {
  headers: HeadersInit;
  blocked?: NextResponse;
};

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function resolveCorsOrigin(request: NextRequest): string {
  const origin = request.headers.get("origin");
  if (!origin) return "";
  return origin;
}

export function applyApiGuards(request: NextRequest): GuardResult {
  const origin = resolveCorsOrigin(request);
  const headers: HeadersInit = {
    Vary: "Origin",
  };

  if (origin) {
    if (!allowedOrigins.has(origin)) {
      return {
        headers,
        blocked: NextResponse.json({ error: "Forbidden origin" }, { status: 403, headers }),
      };
    }
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET,POST,PATCH,PUT,DELETE,OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  const ip = getClientIp(request);
  const rl = consumeRateLimit(ip);
  if (!rl.allowed) {
    headers["Retry-After"] = String(rl.retryAfter);
    return {
      headers,
      blocked: NextResponse.json({ error: "Too many requests" }, { status: 429, headers }),
    };
  }

  return { headers };
}

export function handleOptions(request: NextRequest): NextResponse {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;
  return new NextResponse(null, { status: 204, headers: guard.headers });
}

export function jsonWithCors(
  request: NextRequest,
  body: Record<string, unknown>,
  status = 200,
): NextResponse {
  const guard = applyApiGuards(request);
  if (guard.blocked) return guard.blocked;
  return NextResponse.json(body, { status, headers: guard.headers });
}

