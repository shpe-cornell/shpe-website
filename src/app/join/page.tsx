"use client";

import { FormEvent, useMemo, useState } from "react";
import { Changa } from "next/font/google";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });
const netIdPattern = /^[a-z0-9]+$/;

type Step = "form" | "already" | "success";
type JoinResponse = {
  status?: "already" | "success";
  firstName?: string;
  error?: string;
};

export default function JoinPage() {
  const [netId, setNetId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [graduationSemester, setGraduationSemester] = useState("Spring");
  const [major, setMajor] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");

  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");

  const normalizedNetId = netId.trim().toLowerCase();
  const cornellEmail = useMemo(
    () => (normalizedNetId ? `${normalizedNetId}@cornell.edu` : ""),
    [normalizedNetId],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!netIdPattern.test(normalizedNetId)) {
      setErrorMsg("Net ID format looks incorrect. Expected format: abc123");
      return;
    }

    const gradYear = Number.parseInt(graduationYear, 10);
    if (!Number.isInteger(gradYear) || gradYear < 2000 || gradYear > 2100) {
      setErrorMsg("Please enter a valid graduation year.");
      return;
    }

    setSubmitting(true);

    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        netId: normalizedNetId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        graduationYear: gradYear.toString(),
        graduationSemester,
        major: major.trim(),
        personalEmail: personalEmail.trim() || undefined,
      }),
    });

    const payload = (await response.json()) as JoinResponse;

    if (!response.ok) {
      setErrorMsg(payload.error ?? "Something went wrong creating your account. Please try again.");
      setSubmitting(false);
      return;
    }

    if (payload.status === "already") {
      setDisplayName(payload.firstName ?? firstName.trim());
      setStep("already");
      setSubmitting(false);
      return;
    }

    if (payload.status === "success") {
      setDisplayName(payload.firstName ?? firstName.trim());
      setStep("success");
      setSubmitting(false);
      return;
    }

    setErrorMsg("Something went wrong creating your account. Please try again.");
    setSubmitting(false);
  }

  return (
    <div
      className={`min-h-screen pt-28 pb-12 px-4 flex items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
    >
      <div className="w-full max-w-xl bg-[#00163E]/70 border border-[#0070C0]/40 rounded-2xl shadow-[0_12px_34px_rgba(0,0,0,0.32)] p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/shpe-logos/shpe-emblem-transparent.png"
            className="w-16 h-16 mb-4"
            alt="SHPE Logo"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Join SHPE Cornell
          </h1>
          <p className="text-[#A4C2FF] mt-2 text-sm sm:text-base">
            Complete your member signup to get plugged in.
          </p>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Net ID (e.g. abc123)"
              value={netId}
              onChange={(e) => setNetId(e.target.value.toLowerCase())}
              required
              autoComplete="off"
              autoCapitalize="none"
              className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />

            <input
              type="text"
              value={cornellEmail}
              readOnly
              placeholder="Cornell Email"
              className="w-full px-5 py-3 text-[#A4C2FF] bg-[#001A40] border-2 border-[#0070C0] rounded-lg outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Graduation Year (e.g. 2028)"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                required
                className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
              />
              <select
                value={graduationSemester}
                onChange={(e) => setGraduationSemester(e.target.value)}
                className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none"
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />

            <input
              type="email"
              placeholder="Personal Email (optional)"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
            />

            {errorMsg && (
              <p className="text-[#FD652F] text-sm text-center font-semibold">
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-[#FD652F] hover:bg-[#e65516] disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
            >
              {submitting ? "Submitting..." : "Create Membership"}
            </button>
          </form>
        )}

        {step === "already" && (
          <div className="mt-8 text-center">
            <p className="text-5xl mb-3">👋</p>
            <p className="text-3xl text-[#FD652F] font-bold">
              You&apos;re already registered!
            </p>
            <p className="text-[#A4C2FF] mt-2">
              {displayName ? `Welcome back, ${displayName}.` : "Welcome back."}
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="mt-8 text-center">
            <p className="text-5xl mb-3">✅</p>
            <p className="text-3xl text-white font-bold">
              Welcome, {displayName || firstName.trim()}!
            </p>
            <p className="text-[#A4C2FF] mt-2">
              You&apos;re now signed up as a SHPE Cornell member.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
