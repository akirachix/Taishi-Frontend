// import React, { useState, useEffect } from "react";
// import { fetchCaseBrief, generateCaseBrief } from "@/app/utils/caseBrief";
// import handleDownloadCaseBrief from "@/app/utils/download_casebrief";

// export default function CaseSummarySection({ transcriptionId }: { transcriptionId: number }) {
//   const [caseBriefs, setCaseBriefs] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [generating, setGenerating] = useState(false);

//   useEffect(() => {
//     const fetchCaseBriefData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await fetchCaseBrief(transcriptionId);
//         setCaseBriefs(data);
//       } catch (error) {
//         console.error("Error fetching case brief:", error);
//         setError("Failed to fetch case brief. Please generate it below.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseBriefData();
//   }, [transcriptionId]);

//   const handleDownload = async () => {
//     try {
//       await handleDownloadCaseBrief(transcriptionId);
//     } catch (error) {
//       console.error("Error downloading case brief:", error);
//       setError("Failed to download case brief.");
//     }
//   };

//   const handleGenerateCaseBrief = async () => {
//     try {
//       setGenerating(true);
//       setError(null);
//       const generatedBrief = await generateCaseBrief(transcriptionId);
//       setCaseBriefs([generatedBrief]); 
//       alert("Case brief generated successfully!");
//     } catch (error) {
//       console.error("Error generating case brief:", error);
//       setError("Failed to generate case brief.");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   if (loading) return <p>Loading case brief...</p>;

//   return (
//     <>
//       <div className="max-h-[655px] overflow-y-auto">
//         {caseBriefs?.length > 0 ? (
//           <div>
//             {caseBriefs.map((caseBrief: any, index: number) => (
//               <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                 <div
//                   className="text-[23px] leading-7"
//                   dangerouslySetInnerHTML={{
//                     __html: (caseBrief.generated_caseBrief || "Case brief content not available")
//                       .replace(/\n/g, "<br/>"),
//                   }}
//                 ></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center">
//             {error && <p className="text-red-500 mb-4 text-[23px]">{error}</p>}
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleGenerateCaseBrief}
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-semibold text-lg transition-all shadow-md"
//                 disabled={generating}
//               >
//                 {generating ? "Generating..." : "Generate Case Brief"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       {caseBriefs?.length > 0 && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleDownload}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold text-lg transition-all shadow-md"
//           >
//             Download Case Brief as PDF
//           </button>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import { fetchCaseBrief, createCaseBrief } from "@/app/utils/caseBrief";
import handleDownloadCaseBrief from "@/app/utils/download_casebrief";

interface CaseSummarySectionProps {
  transcriptionId: number;
  isActive: boolean;
}

const CaseSummarySection: React.FC<CaseSummarySectionProps> = ({
  transcriptionId,
  isActive
}) => {
  const [caseBriefs, setCaseBriefs] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchExistingCaseBrief = async () => {
    try {
      setLoading(true);
      const data = await fetchCaseBrief(transcriptionId);
      setCaseBriefs(data);
    } catch (error) {
      setError("Failed to fetch case brief");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchExistingCaseBrief();
    }
  }, [isActive, transcriptionId]);

  const handleGenerateCaseBrief = async () => {
    try {
      setGenerating(true);
      setError(null);
      // Generate new case brief
      await createCaseBrief(transcriptionId);
      // Fetch the updated case briefs
      await fetchExistingCaseBrief();
    } catch (error) {
      console.error("Failed to generate case brief:", error);
      setError("Failed to generate case brief");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      await handleDownloadCaseBrief(transcriptionId);
    } catch (error) {
      setError("Failed to download case brief");
    }
  };

  if (loading) return <p>Loading case brief...</p>;
  if (generating) return <p>Generating case brief...</p>;

  return (
    <>
      <div className="max-h-[655px] overflow-y-auto">
        {caseBriefs ? (
          <div>
              <div className="mb-4 p-2 border-b border-gray-300">
                  <div

                  className="text-[23px] leading-7"
                  dangerouslySetInnerHTML={{
                    __html: (caseBriefs.generated_caseBrief || "Case brief content not available")
                      .replace(/\n/g, "<br/>")
                      .replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>"),
                  }}
                ></div>
              </div>
          </div>
          
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4 pt-16">
              No case brief available for this hearing.
            </p>
            <button
              onClick={handleGenerateCaseBrief}
              disabled={generating}
              className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300"
            >
              {generating ? "Generating..." : "Generate Case Brief"}
            </button>
          </div>
        )}
      </div>
      {caseBriefs&& (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold text-lg transition-all shadow-md"
          >
            Download Case Brief as PDF
          </button>
        </div>
      )}
    </>
  );
};

export default CaseSummarySection;