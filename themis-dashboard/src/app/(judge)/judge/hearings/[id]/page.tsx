
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AlertCircle, ArrowLeft } from "lucide-react";
// import tinycolor from "tinycolor2";
// import Layout from "@/app/Layout";
// import Link from "next/link";
// import { getSingleTranscription } from "@/app/utils/singleTranscription";
// import { fetchDiarization } from "@/app/utils/diarization";
// import { fetchCaseBrief } from "@/app/utils/caseBrief";
// import { fetchCaseLaw } from "@/app/utils/caseMatching";
// import handleDownloadCaseBrief from "@/app/utils/download_casebrief";
// import { CaseLaw } from "../../../../../../types";

// export default function HearingDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter();
//   const transcriptionId = parseInt(params.id);
//   const [transcription, setTranscription] = useState<any>(null);
//   const [diarization, setDiarization] = useState<any>(null);
//   const [caseBriefs, setCaseBriefs] = useState<any>(null);
//   const [caseLaws, setCaseLaws] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeSection, setActiveSection] = useState("Full Hearing Notes");

//   // Fetch transcription, diarization, and case brief data when component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const transcriptionData = await getSingleTranscription(transcriptionId);
//         const diarizationData = await fetchDiarization(transcriptionId);
//         const caseBriefsData = await fetchCaseBrief(transcriptionId);
//         const caseLawsData = await fetchCaseLaw(transcriptionId);

//         setTranscription(transcriptionData);
//         setDiarization(diarizationData);
//         setCaseBriefs(caseBriefsData);
//         setCaseLaws(caseLawsData.case);
//       } catch (error) {
//         setError(
//           "Failed to fetch transcription, diarization, or case brief data"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [transcriptionId]);

//   const handleDownload = async () => {
//     try {
//       await handleDownloadCaseBrief(transcriptionId);
//     } catch (error) {
//       setError("Failed to download case brief");
//     }
//   };

//   const handleGenerateCaseBrief = async () => {
//     try {
//       setLoading(true);
//       const updatedCaseBriefs = await fetchCaseBrief(transcriptionId);
//       setCaseBriefs(updatedCaseBriefs); 
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to generate case brief");
//       setLoading(false);
//     }
//   };

//   const generateRandomColor = (): string => {
//     return tinycolor.random().toHexString();
//   };

//   const getColorForSpeaker = (
//     speaker: string,
//     speakerColorMap: { [key: string]: string }
//   ) => {
//     if (!speakerColorMap[speaker]) {
//       speakerColorMap[speaker] = generateRandomColor();
//     }
//     return speakerColorMap[speaker];
//   };

//   const formatDiarizationTextWithColors = (text: string) => {
//     if (!text) return "";

//     const speakerColorMap: { [key: string]: string } = {};
//     const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
//       const color = getColorForSpeaker(speaker, speakerColorMap);
//       return `<strong style="color: ${color};">${speaker}</strong>`;
//     });

//     const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
//       return `<p key=${index} style="color: black; margin-bottom: 16px; font-size:25px;">${paragraph}</p>`;
//     });

//     return paragraphs.join("");
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <p>Loading...</p>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="flex items-center mb-2">
//           <button onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="text-[#F99D15]" />
//           </button>
//           <h1 className="text-xl font-bold text-[#F99D15]">Hearings</h1>
//         </div>
//         <div className="flex flex-col items-center justify-center mt-52 p-4">
//           <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
//           <p className="text-xl font-semibold text-gray-800 text-center">
//             {error}
//           </p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="md:p-8 bg-white">
//         <div className="flex items-center mb-2">
//           <button onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="text-[#F99D15]" />
//           </button>
//           <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">
//             Hearings
//           </h1>
//         </div>

//         <div className="flex gap-[8%] border-b">
//           {[
//             "Full Hearing Notes",
//             "What Speakers Said",
//             "Hearing Case Summary",
//             "Matching Cases",
//           ].map((section) => (
//             <button
//               key={section}
//               className={`py-2 px-4 font-semibold text-[20px] ${
//                 activeSection === section
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : "text-black"
//               }`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </div>

//         <div className="mt-4">
//           {activeSection === "Full Hearing Notes" && (
//             <div className="max-h-[755px] overflow-y-auto">
//               <div
//                 className="transcription-text"
//                 dangerouslySetInnerHTML={{
//                   __html: formatDiarizationTextWithColors(
//                     transcription.transcription_text ||
//                       "Transcription does not exist"
//                   ),
//                 }}
//               />
//             </div>
//           )}

//           {activeSection === "What Speakers Said" && (
//             <div className="max-h-[755px] overflow-y-auto">
//               {diarization?.diarization_data ? (
//                 <div
//                   className="diarization-text"
//                   dangerouslySetInnerHTML={{
//                     __html: formatDiarizationTextWithColors(
//                       diarization.diarization_data
//                     ),
//                   }}
//                 />
//               ) : (
//                 <p>No diarization data available.</p>
//               )}
//             </div>
//           )}

//           {activeSection === "Hearing Case Summary" && (
//             <>
//               <div className="max-h-[655px] overflow-y-auto">
//                 {caseBriefs.length > 0 ? (
//                   <div>
//                     {caseBriefs.map((caseBrief:any, index:number) => (
//                       <div
//                         key={index}
//                         className="mb-4 p-2 border-b border-gray-300"
//                       >
//                         <h2 className="font-semibold">
//                           Case Brief {index + 1}
//                         </h2>
//                         <p>
//                           {caseBrief.generated_caseBrief ||
//                             "Case brief content not available"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div>
//                     <p>No case brief available for this hearing.</p>
//                     <button
//                       onClick={handleGenerateCaseBrief}
//                       className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md"
//                     >
//                       Generate Case Brief
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleDownload}
//                 className="mt-4 ml-[20%] w-[50%] bg-orange-700 text-white py-4 px-4 rounded hover:bg-orange-800 transition-colors"
//               >
//                 Download Case Brief as PDF
//               </button>
//             </>
//           )}

//           {activeSection === "Matching Cases" && (
//             <div className="grid grid-cols-1 gap-4 mt-24 px-4">
//               <div className="space-y-4">
//                 <div className="max-h-[655px]">
//                   {caseLaws.length > 0 ? (
//                     <div className="flex gap-16 w-full">

//                       {/* Left Column */}
//                       <div className="w-full">
//                         {caseLaws
//                           .slice(0, Math.ceil(caseLaws.length / 2))
//                           .map((caseLaw: CaseLaw, index:number) => (
//                             <div
//                               key={index}
//                               className={`mb-4 p-4 rounded-md ${
//                                 index % 2 === 0
//                                   ? "bg-[#B5D3F1]"
//                                   : "bg-[#D9E5F2]"
//                               }`}
//                             >
//                               <Link
//                                 href={caseLaw.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <h2 className="text-sm font-medium">
//                                   {caseLaw.title}
//                                 </h2>
//                               </Link>
//                             </div>
//                           ))}
//                       </div>

//                       {/* Right Column */}
//                       <div className="w-full">
//                         {caseLaws
//                           .slice(Math.ceil(caseLaws.length / 2))
//                           .map((caseLaw:CaseLaw, index:number) => (
//                             <div
//                               key={index}
//                               className={`mb-4 p-4 rounded-md ${
//                                 index % 2 === 0
//                                   ? "bg-[#B5D3F1]"
//                                   : "bg-[#D9E5F2]"
//                               }`}
//                             >
//                               <Link
//                                 href={caseLaw.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <h2 className="text-sm font-medium">
//                                   {caseLaw.title}
//                                 </h2>
//                               </Link>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <p>No case laws available for this hearing.</p>
//                       <button
//                         onClick={handleGenerateCaseBrief}
//                         className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md"
//                       >
//                         Generate Case Laws
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Layout from "@/app/Layout";
import FullHearingNotes from "../../sections/FullHearingNotes";
import SpeakerSection from "../../sections/SpeakerSection";
import CaseSummarySection from "../../sections/CaseSummarySection";
import MatchingCasesSection from "../../sections/MatchingCasesSection";

export default function HearingDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
    <Layout>
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
    </Layout>
  );
}