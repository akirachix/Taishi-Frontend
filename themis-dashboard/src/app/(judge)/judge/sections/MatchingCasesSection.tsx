// import React, { useState, useEffect } from "react";
// import { fetchCaseLaw } from "@/app/utils/caseMatching";
// import Link from "next/link";
// import { CaseLaw } from "../../../../../types";

// export default function MatchingCasesSection({ transcriptionId }: { transcriptionId: number }) {
//   const [caseLaws, setCaseLaws] = useState<CaseLaw[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCaseLawData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchCaseLaw(transcriptionId);
//         setCaseLaws(data.case || []);
//       } catch (error) {
//         setError("Failed to fetch matching cases");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseLawData();
//   }, [transcriptionId]);

//   if (loading) return <p>Loading matching cases...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 gap-4 mt-24 px-4">
//       <div className="space-y-4">
//         <div className="max-h-[655px]">
//           {caseLaws.length > 0 ? (
//             <div className="flex gap-16 w-full">
//               {/* Left Column */}
//               <div className="w-full">
//                 {caseLaws
//                   .slice(0, Math.ceil(caseLaws.length / 2))
//                   .map((caseLaw, index) => (
//                     <div
//                       key={index}
//                       className={`mb-4 p-4 rounded-md ${
//                         index % 2 === 0 ? "bg-[#B5D3F1]" : "bg-[#D9E5F2]"
//                       }`}
//                     >
//                       <Link
//                         href={caseLaw.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <h2 className="text-sm font-medium">{caseLaw.title}</h2>
//                       </Link>
//                     </div>
//                   ))}
//               </div>

//               {/* Right Column */}
//               <div className="w-full">
//                 {caseLaws
//                   .slice(Math.ceil(caseLaws.length / 2))
//                   .map((caseLaw, index) => (
//                     <div
//                       key={index}
//                       className={`mb-4 p-4 rounded-md ${
//                         index % 2 === 0 ? "bg-[#B5D3F1]" : "bg-[#D9E5F2]"
//                       }`}
//                     >
//                       <Link
//                         href={caseLaw.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <h2 className="text-sm font-medium">{caseLaw.title}</h2>
//                       </Link>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ) : (
//             <div>
//               <p>No case laws available for this hearing.</p>
//               <button
//                 onClick={() => {}} // Add generate function if needed
//                 className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md"
//               >
//                 Generate Case Laws
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { fetchCaseLaw, createCaseLaws } from "@/app/utils/caseMatching";
import Link from "next/link";
import { CaseLaw } from "../../../../../types";

interface MatchingCasesSectionProps {
  transcriptionId: number;
  isActive: boolean;
}

export default function MatchingCasesSection ({
  transcriptionId,
  isActive,
}: MatchingCasesSectionProps) {
  const [caseLaws, setCaseLaws] = useState<CaseLaw[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchCaseLawData = async () => {
    try {
      setLoading(true);
      console.log('I am loading');
      
      const data = await fetchCaseLaw(transcriptionId);

      console.log('data generated', data);
      console.log('DATA:', data.case.related_cases);
      
      const transformedCaseLaws = data.case.related_cases.map(([title, link]: [string, string]) => ({
        title,
        link,
      }));
  
      console.log('Transformed CaseLaws:', transformedCaseLaws);
  
      setCaseLaws(transformedCaseLaws);
    } catch (error) {
      console.error("Error fetching case laws:", error);
      setError("Failed to fetch matching cases");
    } finally {
      setLoading(false);
    }
  };

  // Fetching existing case laws once 'Matching Cases' section is active

  useEffect(() => {
    if (isActive) {
      fetchCaseLawData();
    }
  }, [isActive, transcriptionId]);

  const handleCreateCaseLaws = async () => {
    try {
      setGenerating(true);
      setError(null);
      await createCaseLaws(transcriptionId);
      await fetchCaseLawData();
    } catch (error) {
      console.error("Failed to generate case laws:", error);
      setError("Failed to generate case laws");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <p>Loading matching cases...</p>;
  if (generating) return <p>Generating case laws...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 mt-24 px-4">
      <div className="space-y-4">
        <div className="max-h-[655px]">
          {caseLaws.length > 0 ? (
            <div className="flex gap-16 w-full">
              {/* Left Column */}
              <div className="w-full">
                {caseLaws
                  .slice(0, Math.ceil(caseLaws.length / 2))
                  .map((caseLaw, index) => (
                    <div
                      key={index}
                      className={`mb-4 p-4  ${
                        index % 2 === 0 ? "bg-[#B5D3F1]" : "bg-[#D9E5F2]"
                      }`}
                    >
                      <Link
                        href={caseLaw.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className="text-[20px] font-bold text-decoration-line: underline">{caseLaw.title}</h2>

                      </Link>
                    </div>
                  ))}
              </div>

              {/* Right Column */}
              <div className="w-full">
                {caseLaws
                  .slice(Math.ceil(caseLaws.length / 2))
                  .map((caseLaw, index) => (
                    <div
                    
                      key={index}
                      className={`mb-4 p-4 rounded-md"  ${
                        index % 2 === 0 ? "bg-[#B5D3F1]" : "bg-[#D9E5F2]"
                      }`}
                    >
                      <Link
                        href={caseLaw.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className="text-[20px] font-bold text-decoration-line: underline">{caseLaw.title}</h2>

                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg mb-4">
                No case laws available for this hearing.
              </p>
              <button
                onClick={handleCreateCaseLaws}
                disabled={generating}
                className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300"
              >
                {generating ? "Generating..." : "Generate Case Laws"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}