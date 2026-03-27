"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Changa } from "next/font/google";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });
const netIdPattern = /^[a-z0-9]+$/;

type Event = {
  id: number;
  name: string;
  date: string;
  points_value: number;
  is_open: boolean;
  google_form_url: string | null;
  school_year: string;
};

type Member = {
  id: number;
  first_name: string;
  last_name: string;
};

type CheckinApiResponse = {
  status?: "signup_required" | "already" | "success";
  member?: Member;
  event?: Event;
  error?: string;
};

const majorOptions = [
  { label: "Aerospace Engineering", value: "Aerospace Engineering" },
  { label: "Applied Mathematics", value: "Applied Mathematics" },
  { label: "Biological Engineering [BE]", value: "BE" },
  { label: "Biomedical Engineering [BME]", value: "BME" },
  { label: "Chemical Engineering [ChemE]", value: "ChemE" },
  { label: "Civil Engineering [CivE]", value: "CivE" },
  { label: "Computer Science [CS]", value: "CS" },
  { label: "Earth and Atmospheric Sciences [EAS]", value: "EAS" },
  { label: "Electrical and Computer Engineering [ECE]", value: "ECE" },
  { label: "Engineering Physics", value: "Physics" },
  { label: "Environmental Engineering [EnvE]", value: "EnvE" },
  {
    label: "Information Science, Systems, and Technology [ISST]",
    value: "ISST",
  },
  { label: "Materials Science and Engineering [MSE]", value: "MSE" },
  { label: "Mechanical Engineering [MechE]", value: "MechE" },
  { label: "Operations Research and Management Science [ORIE]", value: "ORIE" },
  { label: "Other (please specify)", value: "OTHER" },
] as const;

const orderedMajorOptions = [
  ...majorOptions.filter((option) => option.value !== "OTHER"),
  ...majorOptions.filter((option) => option.value === "OTHER"),
];

export default function CheckInPageClient() {
  const params = useParams<{ eventId: string | string[] }>();
  const eventId = Array.isArray(params?.eventId)
    ? params.eventId[0]
    : params?.eventId;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [netId, setNetId] = useState("");
  const [step, setStep] = useState<
    "netid" | "signup" | "success" | "closed" | "already" | "notfound"
  >("netid");
  const [member, setMember] = useState<Member | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [majorSelections, setMajorSelections] = useState<string[]>([]);
  const [otherMajor, setOtherMajor] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [gradSemester, setGradSemester] = useState("Spring");
  const [submitting, setSubmitting] = useState(false);
  const [checkingNetId, setCheckingNetId] = useState(false);

  function resetToNetIdEntry() {
    setStep("netid");
    setMember(null);
    setErrorMsg(null);
    setNetId("");
    setFirstName("");
    setLastName("");
    setMajorSelections([]);
    setOtherMajor("");
    setPersonalEmail("");
    setGradYear("");
    setGradSemester("Spring");
    setSubmitting(false);
    setCheckingNetId(false);
  }

  useEffect(() => {
    void fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (step !== "success") return;

    const rawGoogleFormUrl = event?.google_form_url?.trim() ?? "";
    const normalizedGoogleFormUrl = rawGoogleFormUrl.toLowerCase();
    const timers: number[] = [];

    if (!rawGoogleFormUrl) {
      return;
    }

    if (normalizedGoogleFormUrl === "none") {
      timers.push(window.setTimeout(() => resetToNetIdEntry(), 3000));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    let isValidUrl = false;
    try {
      const parsed = new URL(rawGoogleFormUrl);
      isValidUrl = parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      isValidUrl = false;
    }

    if (isValidUrl) {
      timers.push(
        window.setTimeout(() => {
          const newTab = window.open(rawGoogleFormUrl, "_blank", "noopener,noreferrer");
          if (!newTab) {
            window.location.href = rawGoogleFormUrl;
          }
        }, 2000),
      );
    }

    timers.push(window.setTimeout(() => resetToNetIdEntry(), 3000));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [step, event?.google_form_url]);

  async function fetchEvent() {
    if (!eventId) {
      setLoading(false);
      setStep("notfound");
      return;
    }

    const response = await fetch(`/api/checkin?eventId=${encodeURIComponent(eventId)}`, {
      method: "GET",
      cache: "no-store",
    });

    const payload = (await response.json()) as CheckinApiResponse;

    if (!response.ok || !payload.event) {
      setLoading(false);
      setStep("notfound");
      return;
    }

    setEvent(payload.event);
    setLoading(false);

    if (!payload.event.is_open) {
      setStep("closed");
    }
  }

  async function handleNetIdSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checkingNetId) return;
    setErrorMsg(null);

    const normalizedNetId = netId.trim().toLowerCase();
    if (!normalizedNetId) return;

    if (!netIdPattern.test(normalizedNetId)) {
      setErrorMsg("Net ID format looks incorrect. Expected format: abc123");
      return;
    }

    if (!eventId) {
      setErrorMsg("Event link is invalid or expired.");
      return;
    }

    setCheckingNetId(true);

    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, netId: normalizedNetId }),
    });

    const payload = (await response.json()) as CheckinApiResponse;

    if (!response.ok) {
      setErrorMsg(payload.error ?? "Could not continue check-in.");
      setCheckingNetId(false);
      return;
    }

    if (payload.status === "signup_required") {
      setStep("signup");
      setCheckingNetId(false);
      return;
    }

    if (payload.status === "already") {
      setMember(payload.member ?? null);
      setStep("already");
      setCheckingNetId(false);
      return;
    }

    if (payload.status === "success") {
      setMember(payload.member ?? null);
      setStep("success");
      setCheckingNetId(false);
      return;
    }

    setCheckingNetId(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);

    const normalizedNetId = netId.trim().toLowerCase();
    if (!netIdPattern.test(normalizedNetId)) {
      setErrorMsg("Net ID format looks incorrect. Expected format: abc123");
      return;
    }

    const selectedMajors = orderedMajorOptions
      .map((option) => option.value)
      .filter((value) => value !== "OTHER" && majorSelections.includes(value));
    const includesOther = majorSelections.includes("OTHER");
    const typedOtherMajor = otherMajor.trim();

    if (selectedMajors.length === 0 && !includesOther) {
      setErrorMsg("Please select at least one major.");
      return;
    }

    if (includesOther && !typedOtherMajor) {
      setErrorMsg("Please specify your major for Other.");
      return;
    }

    const resolvedMajor = includesOther
      ? [...selectedMajors, typedOtherMajor].filter(Boolean).join(", ")
      : selectedMajors.join(", ");

    const parsedGradYear = Number.parseInt(gradYear, 10);
    if (!Number.isInteger(parsedGradYear) || parsedGradYear < 1865 || parsedGradYear > 2035) {
      setErrorMsg("Please enter a valid graduation year");
      return;
    }

    if (!eventId) {
      setErrorMsg("Event link is invalid or expired.");
      return;
    }

    setSubmitting(true);

    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        netId: normalizedNetId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        major: resolvedMajor,
        gradYear,
        gradSemester,
        personalEmail: personalEmail.trim() || undefined,
      }),
    });

    const payload = (await response.json()) as CheckinApiResponse;

    if (!response.ok) {
      setErrorMsg(payload.error ?? "Something went wrong creating your account.");
      setSubmitting(false);
      return;
    }

    if (payload.status === "already") {
      setMember(payload.member ?? null);
      setStep("already");
      setSubmitting(false);
      return;
    }

    if (payload.status === "success") {
      setMember(payload.member ?? null);
      setStep("success");
      setSubmitting(false);
      return;
    }

    setErrorMsg("Something went wrong creating your account. Please try again.");
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
      >
        <img
          src="/images/shpe-logos/shpe-emblem-transparent.png"
          className="w-20 h-20 animate-spin"
          alt="Loading"
        />
      </div>
    );
  }

  if (step === "notfound") {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] gap-4 ${changa.className}`}
      >
        <img
          src="/images/shpe-logos/shpe-emblem-transparent.png"
          className="w-20 h-20 opacity-40"
          alt="SHPE Logo"
        />
        <p className="text-white text-2xl font-bold">Event not found.</p>
        <p className="text-[#A4C2FF] text-sm">This link may be invalid or expired.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] px-4 pt-28 pb-8 ${changa.className}`}
    >
      <img
        src="/images/shpe-logos/shpe-emblem-transparent.png"
        className="w-12 h-12 sm:w-14 sm:h-14 mb-3"
        alt="SHPE Logo"
      />
      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 text-center">{event?.name}</h1>
      <p className="text-[#A4C2FF] mb-4 text-center text-sm">
        {event ? new Date(event.date).toLocaleDateString() : ""}{" "}
        {event ? `· ${event.points_value} pts` : ""}
      </p>

      {step === "closed" && (
        <div className="text-center">
          <p className="text-3xl text-[#FD652F] font-bold">Check-in is closed.</p>
          <p className="text-[#A4C2FF] mt-2 text-sm">This event is no longer accepting check-ins.</p>
        </div>
      )}

      {step === "netid" && (
        <form onSubmit={handleNetIdSubmit} className="flex flex-col items-center gap-3 w-full max-w-md">
          <label className="text-[#FD652F] text-xl sm:text-2xl font-bold">Enter Your Net ID</label>
          <input
            type="text"
            value={netId}
            onChange={(e) => setNetId(e.target.value.toLowerCase())}
            placeholder="e.g. abc123"
            className="w-full px-4 py-3 text-center text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF] focus:ring-2 focus:ring-[#FD652F]"
            autoComplete="off"
            autoCapitalize="none"
          />
          {errorMsg && <p className="text-[#FD652F] text-sm text-center font-semibold">⚠️ {errorMsg}</p>}
          <button
            type="submit"
            disabled={checkingNetId}
            style={{ WebkitTapHighlightColor: "transparent" }}
            className="w-full sm:w-40 h-10 appearance-none touch-manipulation select-none bg-[#FD652F] hover:bg-[#e65516] active:bg-[#d94f14] disabled:bg-[#d94f14] text-white font-semibold px-8 py-2 rounded-full shadow-none transition-colors duration-75 focus:outline-none focus-visible:outline-none"
          >
            {checkingNetId ? "Checking In..." : "Check In"}
          </button>
        </form>
      )}

      {step === "already" && (
        <div className="text-center">
          <p className="text-5xl mb-3">👋</p>
          <p className="text-3xl text-[#FD652F] font-bold">Already checked in!</p>
          <p className="text-[#A4C2FF] mt-2">
            Hey {member?.first_name}, you already checked into this event.
          </p>
          <button
            type="button"
            onClick={resetToNetIdEntry}
            className="mt-4 text-[#A4C2FF] text-sm underline"
          >
            ← Back to Net ID
          </button>
        </div>
      )}

      {step === "signup" && (
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-3 w-full max-w-2xl max-h-[calc(100dvh-11.5rem)] overflow-y-auto pr-1 pb-2"
        >
          <div className="text-center">
            <p className="text-white font-bold text-base sm:text-lg">Welcome to SHPE Cornell!</p>
            <p className="text-[#A4C2FF] text-xs sm:text-sm mt-0.5">New members: this setup is one-time only.</p>
          </div>

          <div className="w-full px-4 py-2 text-[#A4C2FF] bg-[#001A40] border-2 border-[#0070C0] rounded-lg text-xs sm:text-sm">
            Net ID: <span className="text-white font-bold">{netId}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />
          </div>

          <div className="w-full rounded-lg border-2 border-[#FD652F] bg-[#002F6C] px-3 py-2">
            <div className="mb-1 px-1">
              <p className="text-xs sm:text-sm font-semibold text-[#FD652F]">Select Major(s)</p>
              <p className="text-[11px] sm:text-xs text-[#A4C2FF] mt-0.5">
                {majorSelections.length} {majorSelections.length === 1 ? "major selected" : "majors selected"}
              </p>
            </div>
            <div className="relative">
              <div className="max-h-[10rem] overflow-y-auto pr-1 pb-12 space-y-1.5">
                {orderedMajorOptions.map((majorOption) => {
                  const isSelected = majorSelections.includes(majorOption.value);
                  const isOther = majorOption.value === "OTHER";
                  return (
                    <div
                      key={majorOption.value}
                      className={`w-full rounded-2xl border transition-colors ${
                        isSelected
                          ? "bg-[#FD652F] text-white border-[#FD652F]"
                          : "bg-[#001A40] text-[#E5EFFF] border-[#0070C0]"
                      }`}
                    >
                      {isOther && isSelected ? (
                        <div className="flex items-center gap-2 p-2">
                          <button
                            type="button"
                            onClick={() => {
                              setMajorSelections((prev) => prev.filter((value) => value !== majorOption.value));
                              setOtherMajor("");
                            }}
                            className="min-h-12 px-3 text-xs sm:text-sm font-medium text-left rounded-full border border-white/35 bg-white/10 whitespace-nowrap"
                          >
                            {majorOption.label}
                          </button>
                          <input
                            type="text"
                            placeholder="Please specify your major"
                            value={otherMajor}
                            onChange={(e) => setOtherMajor(e.target.value)}
                            required
                            className="min-h-12 flex-1 px-3 py-2 text-sm text-white bg-[#002F6C] border border-white/40 rounded-lg outline-none placeholder:text-[#A4C2FF]"
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setMajorSelections((prev) => {
                              if (prev.includes(majorOption.value)) {
                                return prev.filter((value) => value !== majorOption.value);
                              }
                              return [...prev, majorOption.value];
                            });
                          }}
                          className="w-full min-h-12 px-3 text-xs sm:text-sm font-medium text-left"
                        >
                          {majorOption.label}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-1 h-10 rounded-b-lg bg-gradient-to-t from-[#002F6C] via-[#002F6C]/90 to-transparent backdrop-blur-[1.5px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Grad Year (e.g. 2027)"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              min="1865"
              max="2035"
              autoComplete="off"
              required
              className="w-full px-3 py-2 text-sm text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />
            <select
              value={gradSemester}
              onChange={(e) => setGradSemester(e.target.value)}
              className="w-full px-3 py-2 text-sm text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none"
            >
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
            </select>
          </div>

          <input
            type="email"
            placeholder="Personal Email (optional)"
            value={personalEmail}
            onChange={(e) => setPersonalEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
          />

          {errorMsg && <p className="text-[#FD652F] text-sm text-center font-semibold">⚠️ {errorMsg}</p>}

          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={resetToNetIdEntry} className="text-[#A4C2FF] text-sm underline">
              ← Back to Net ID
            </button>
            <button
              type="submit"
              aria-disabled={submitting}
              className="bg-[#FD652F] hover:bg-[#e65516] active:bg-[#d94f14] active:brightness-95 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.28)] text-white text-sm font-semibold px-8 py-2 rounded-full shadow-md transition-colors duration-75"
            >
              Register and Check In
            </button>
          </div>
        </form>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-2 w-full max-w-xl">
          <p className="text-5xl">✅</p>
          <p className="text-3xl sm:text-4xl font-bold text-white text-center">
            Welcome, {member?.first_name}!
          </p>
          <p className="text-[#A4C2FF] text-base sm:text-lg text-center mb-1">
            Attendance marked - <span className="text-[#FD652F] font-bold">+{event?.points_value} pts</span>{" "}
            awarded!
          </p>
          {(() => {
            const rawGoogleFormUrl = event?.google_form_url?.trim() ?? "";
            const normalizedGoogleFormUrl = rawGoogleFormUrl.toLowerCase();

            if (!rawGoogleFormUrl) {
              return (
                <p className="text-[#85B6FF] text-sm sm:text-base text-center mt-1">
                  You are checked in!
                </p>
              );
            }

            if (normalizedGoogleFormUrl === "none") {
              return (
                <p className="text-[#85B6FF] text-sm sm:text-base text-center mt-1">
                  Ready for the next check-in...
                </p>
              );
            }

            return (
              <p className="text-[#85B6FF] text-sm sm:text-base text-center mt-1">
                Redirecting to questions...
              </p>
            );
          })()}
        </div>
      )}
    </div>
  );
}
