"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { Changa } from "next/font/google";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

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
  net_id: string;
};

export default function CheckInPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [netId, setNetId] = useState("");
  const [step, setStep] = useState<
    "netid" | "signup" | "success" | "closed" | "already"
  >("netid");
  const [member, setMember] = useState<Member | null>(null);

  // New member form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [gradSemester, setGradSemester] = useState("Spring");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  async function fetchEvent() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error || !data) {
      setLoading(false);
      return;
    }
    setEvent(data);
    setLoading(false);
    if (!data.is_open) setStep("closed");
  }

  async function handleNetIdSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!netId.trim()) return;

    // Check if member exists
    const { data: memberData } = await supabase
      .from("members")
      .select("*")
      .eq("net_id", netId.trim().toLowerCase())
      .single();

    if (!memberData) {
      setStep("signup");
      return;
    }

    // Check if already checked in
    const { data: existing } = await supabase
      .from("attendance")
      .select("id")
      .eq("member_id", memberData.id)
      .eq("event_id", eventId)
      .single();

    if (existing) {
      setStep("already");
      setMember(memberData);
      return;
    }

    // Mark attendance
    await markAttendance(memberData.id);
    setMember(memberData);
    setStep("success");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Get active year from settings
    const { data: settings } = await supabase
      .from("settings")
      .select("active_year")
      .single();

    // Create new member
    const { data: newMember, error } = await supabase
      .from("members")
      .insert({
        net_id: netId.trim().toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        graduation_year: parseInt(gradYear),
        graduation_semester: gradSemester,
      })
      .select()
      .single();

    if (error || !newMember) {
      setSubmitting(false);
      return;
    }

    await markAttendance(newMember.id);
    setMember(newMember);
    setStep("success");
    setSubmitting(false);
  }

  async function markAttendance(memberId: number) {
    const { data: settings } = await supabase
      .from("settings")
      .select("active_year")
      .single();

    await supabase.from("attendance").insert({
      member_id: memberId,
      event_id: eventId,
      school_year: settings?.active_year ?? "2025-2026",
    });
  }

  if (loading)
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

  if (!event)
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
      >
        <p className="text-white text-2xl">Event not found.</p>
      </div>
    );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] px-4 ${changa.className}`}
    >
      <img
        src="/images/shpe-logos/shpe-emblem-transparent.png"
        className="w-24 h-24 mb-6"
        alt="SHPE Logo"
      />
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        {event.name}
      </h1>
      <p className="text-[#A4C2FF] mb-8 text-center">
        {new Date(event.date).toLocaleDateString()} · {event.points_value} pts
      </p>

      {/* CLOSED */}
      {step === "closed" && (
        <div className="text-center">
          <p className="text-3xl text-[#FD652F] font-bold">
            Check-in is closed.
          </p>
          <p className="text-[#A4C2FF] mt-2">
            This event is no longer accepting check-ins.
          </p>
        </div>
      )}

      {/* NET ID FORM */}
      {step === "netid" && (
        <form
          onSubmit={handleNetIdSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-sm"
        >
          <label className="text-[#FD652F] text-2xl font-bold">
            Enter Your Net ID
          </label>
          <input
            type="text"
            value={netId}
            onChange={(e) => setNetId(e.target.value)}
            placeholder="e.g. abc123"
            className="w-full px-5 py-3 text-center text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF] focus:ring-2 focus:ring-[#FD652F]"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-8 py-2 rounded-full shadow-md transition"
          >
            Check In
          </button>
        </form>
      )}

      {/* SIGNUP FORM */}
      {step === "signup" && (
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <p className="text-[#A4C2FF] text-center">
            Welcome! Please complete your profile to join SHPE.
          </p>
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
          <input
            type="email"
            placeholder="Cornell Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
          />
          <input
            type="number"
            placeholder="Graduation Year (e.g. 2027)"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            required
            className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF]"
          />
          <select
            value={gradSemester}
            onChange={(e) => setGradSemester(e.target.value)}
            className="w-full px-5 py-3 text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none"
          >
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-8 py-2 rounded-full shadow-md transition"
          >
            {submitting ? "Joining..." : "Join SHPE & Check In"}
          </button>
        </form>
      )}

      {/* ALREADY CHECKED IN */}
      {step === "already" && (
        <div className="text-center">
          <p className="text-3xl text-[#FD652F] font-bold">
            Already checked in!
          </p>
          <p className="text-[#A4C2FF] mt-2">
            Hey {member?.first_name}, you already checked into this event.
          </p>
        </div>
      )}

      {/* SUCCESS */}
      {step === "success" && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-4xl font-bold text-white">
            Welcome, {member?.first_name}! ✅
          </p>
          <p className="text-[#A4C2FF] text-xl">
            Attendance marked — {event.points_value} pts awarded!
          </p>
          {event.google_form_url && (
            <div className="w-full mt-4">
              <p className="text-[#FD652F] font-bold text-center mb-2">
                Please complete this quick form:
              </p>
              <iframe
                src={`${event.google_form_url}?entry.netid=${netId}&embedded=true`}
                width="100%"
                height="600"
                className="rounded-xl border border-[#0070C0]"
              >
                Loading form...
              </iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
