
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {  ArrowLeft } from "lucide-react";
import FullHearingNotes from "../../sections/FullHearingNotes";
import SpeakerSection from "../../sections/SpeakerSection";
import CaseSummarySection from "../../sections/CaseSummarySection";
import MatchingCasesSection from "../../sections/MatchingCasesSection";
import RootLayout from "../../Layout";

export default function HearingDetailPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const router = useRouter();
  const transcriptionId = parseInt(params.id);
  const [activeSection, setActiveSection] = useState("Full Hearing Notes");

  const sections = [
    "Full Hearing Notes",
    "What Speakers Said",
    "Hearing Case Summary",
    "Matching Cases",
  ];

  return (
    <RootLayout>
      <div className="md:p-8 bg-white">
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">
            Hearings
          </h1>
        </div>

        <div className="flex gap-[8%] border-b">
          {sections.map((section) => (
            <button
              key={section}
              className={`py-2 px-4 font-semibold text-[20px] ${
                activeSection === section
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-black"
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeSection === "Full Hearing Notes" && (
            <FullHearingNotes transcriptionId={transcriptionId} />
          )}

          {activeSection === "What Speakers Said" && (
            <SpeakerSection transcriptionId={transcriptionId} />
          )}

          {activeSection === "Hearing Case Summary" && (
            <CaseSummarySection 
            transcriptionId={transcriptionId}
            isActive={activeSection== "Hearing Case Summary"} />
          )}

          {activeSection === "Matching Cases" && (
            <MatchingCasesSection 
            transcriptionId={transcriptionId}
            isActive={activeSection== "Matching Cases"} />
          )}
        </div>
      </div>
    </RootLayout>
  );
}