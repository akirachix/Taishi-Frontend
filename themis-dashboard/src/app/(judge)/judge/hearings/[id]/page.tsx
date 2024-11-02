// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { AlertCircle, ArrowLeft } from 'lucide-react';
// import tinycolor from 'tinycolor2';
// import Layout from '@/app/Layout';
// import { getSingleTranscription } from '@/app/utils/singleTranscription';
// import { fetchDiarization } from '@/app/utils/diarization';

// interface Transcription {
//     id: number;
//     transcription_text: string;
// }

// interface Diarization {
//     diarization_data: string;
// }

// export default function HearingDetailPage({ params }: { params: { id: string } }) {
//     const router = useRouter();
//     const transcriptionId = parseInt(params.id);
//     const [transcription, setTranscription] = useState<Transcription | null>(null);
//     const [diarization, setDiarization] = useState<Diarization | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeSection, setActiveSection] = useState('Full Hearing Notes');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const transcriptionData: Transcription = await getSingleTranscription(transcriptionId);
//                 const diarizationData: Diarization = await fetchDiarization(transcriptionId);

//                 setTranscription(transcriptionData);
//                 setDiarization(diarizationData);
//             } catch (error) {
//                 setError('Failed to fetch transcription or diarization data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [transcriptionId]);

//     if (loading) {
//         return (
//             <Layout>
//                 <p>Loading...</p>
//             </Layout>
//         );
//     }

//     if (error) {
//         return (
//             <Layout>
//                 <div className="flex items-center mb-2">
//                     <button onClick={() => router.back()} className="mr-4">
//                         <ArrowLeft className="text-[#F99D15]" />
//                     </button>
//                     <h1 className="text-xl font-bold text-[#F99D15]">Hearings</h1>
//                 </div>
//                 <div className="flex flex-col items-center justify-center mt-52 p-4">
//                     <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
//                     <p className="text-xl font-semibold text-gray-800 text-center">{error}</p>
//                 </div>
//             </Layout>
//         );
//     }

//     if (!transcription) {
//         return (
//             <Layout>
//                 <div className="flex items-center mb-2">
//                     <button onClick={() => router.back()} className="mr-4">
//                         <ArrowLeft className="text-[#F99D15]" />
//                     </button>
//                     <h1 className="text-xl font-bold text-[#F99D15]">Hearings</h1>
//                 </div>
//                 <div className="flex flex-col items-center justify-center mt-52 p-4">
//                     <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
//                     <p className="text-xl font-semibold text-gray-800 text-center">Transcription not found</p>
//                 </div>
//             </Layout>
//         );
//   }

//   // Generate random colors for each speaker tag
//   const generateRandomColor = (): string => {
//     return tinycolor.random().toHexString();
//   };

//   // Helper function to get a color for each speaker and map it
//   const getColorForSpeaker = (speaker: string, speakerColorMap: { [key: string]: string }) => {
//     if (!speakerColorMap[speaker]) {
//       speakerColorMap[speaker] = generateRandomColor();
//     }
//     return speakerColorMap[speaker];
//   };

//   const formatDiarizationTextWithColors = (text: string) => {
//     if (!text) return '';

//     const speakerColorMap: { [key: string]: string } = {};

    
//     const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
//       const color = getColorForSpeaker(speaker, speakerColorMap);
//       return `<strong style="color: ${color};">${speaker}</strong>`;
//     });

    
//     const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
//       return `<p key=${index} style="color: black; margin-bottom: 16px;">${paragraph}</p>`;
//     });

//     return paragraphs.join('');
//   };

//   return (
//     <Layout>
//       <div className="md:p-8 bg-white">
//         <div className="flex items-center mb-2">
//           <button onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="text-[#F99D15]" />
//           </button>
//           <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">Hearings</h1>
//         </div>

//         {/* Tab Selection */}
//         <div className="flex gap-[10%] border-b">
//           {['Full Hearing Notes', 'What Speakers Said'].map((section) => (
//             <button
//               key={section}
//               className={`py-2 px-4 font-semibold ${
//                 activeSection === section
//                   ? 'text-orange-500 border-b-2 border-orange-500'
//                   : 'text-black'
//               }`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </div>

//         {/* Content Rendering Based on Active Section */}
//         <div className="mt-4">
//           {activeSection === 'Full Hearing Notes' && (
//             <div className="max-h-[755px] overflow-y-auto">
//               <div
//                 className="transcription-text"
//                 dangerouslySetInnerHTML={{
//                   __html: formatDiarizationTextWithColors(
//                     transcription.transcription_text || 'Transcription does not exist'
//                   ),
//                 }}
//               />
//             </div>
//           )}

//           {activeSection === 'What Speakers Said' && (
//             <div className="max-h-[755px] overflow-y-auto">
//               {diarization?.diarization_data ? (
//                 <div
//                   className="diarization-text"
//                   dangerouslySetInnerHTML={{
//                     __html: formatDiarizationTextWithColors(diarization.diarization_data),
//                   }}
//                 />
//               ) : (
//                 <p>No diarization data available.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import tinycolor from 'tinycolor2';
import Layout from '@/app/Layout';
import Link from 'next/link';
import { getSingleTranscription } from '@/app/utils/singleTranscription';
import { fetchDiarization } from '@/app/utils/diarization';
import { fetchCaseBrief } from '@/app/utils/caseBrief';
import handleDownloadCaseBrief from '@/app/utils/download_casebrief';
// import { fetchCaseBriefs, generateCaseBrief } from '@/app/utils/caseBriefs'; // Import case brief functions

export default function HearingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const transcriptionId = parseInt(params.id);
  const [transcription, setTranscription] = useState<any>(null);
  const [diarization, setDiarization] = useState<any>(null);
  const [caseBriefs, setCaseBriefs] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Full Hearing Notes');

  // Fetch transcription, diarization, and case brief data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const transcriptionData = await getSingleTranscription(transcriptionId);
        const diarizationData = await fetchDiarization(transcriptionId);
        const caseBriefsData = await fetchCaseBrief(transcriptionId);

        setTranscription(transcriptionData);
        setDiarization(diarizationData);
        setCaseBriefs(caseBriefsData); // Set multiple case briefs if available
      } catch (error) {
        setError('Failed to fetch transcription, diarization, or case brief data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transcriptionId]);

 
  const handleDownload = async () => {
    try {
      await handleDownloadCaseBrief(transcriptionId);
    } catch (error) {
      setError('Failed to download case brief');
    }
  };




  const handleGenerateCaseBrief = async () => {
    try {
      setLoading(true);
      // await generateCaseBrief(transcriptionId); // Generate case brief
      const updatedCaseBriefs = await fetchCaseBrief(transcriptionId); // Fetch updated list
      setCaseBriefs(updatedCaseBriefs); // Update state with new case brief data
      setLoading(false);
    } catch (error) {
      setError('Failed to generate case brief');
      setLoading(false);
    }
  };

  const generateRandomColor = (): string => {
    return tinycolor.random().toHexString();
  };

  const getColorForSpeaker = (speaker: string, speakerColorMap: { [key: string]: string }) => {
    if (!speakerColorMap[speaker]) {
      speakerColorMap[speaker] = generateRandomColor();
    }
    return speakerColorMap[speaker];
  };

  const formatDiarizationTextWithColors = (text: string) => {
    if (!text) return '';

    const speakerColorMap: { [key: string]: string } = {};
    const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
      const color = getColorForSpeaker(speaker, speakerColorMap);
      return `<strong style="color: ${color};">${speaker}</strong>`;
    });

    const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
      return `<p key=${index} style="color: black; margin-bottom: 16px; font-size:25px;">${paragraph}</p>`;
    });

    return paragraphs.join('');
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl font-bold text-[#F99D15]">Hearings</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-52 p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-xl font-semibold text-gray-800 text-center">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="md:p-8 bg-white">
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">Hearings</h1>
        </div>

        <div className="flex gap-[8%] border-b">
          {['Full Hearing Notes', 'What Speakers Said', 'Hearing Case Summary', 'Matching Cases'].map((section) => (
            <button
              key={section}
              className={`py-2 px-4 font-semibold text-[20px] ${
                activeSection === section ? 'text-orange-500 border-b-2 border-orange-500' : 'text-black'
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeSection === 'Full Hearing Notes' && (
            <div className="max-h-[755px] overflow-y-auto">
              <div
                className="transcription-text"
                dangerouslySetInnerHTML={{ __html: formatDiarizationTextWithColors(transcription.transcription_text || 'Transcription does not exist') }}
              />
            </div>
          )}

          {activeSection === 'What Speakers Said' && (
            <div className="max-h-[755px] overflow-y-auto">
              {diarization?.diarization_data ? (
                <div
                  className="diarization-text"
                  dangerouslySetInnerHTML={{ __html: formatDiarizationTextWithColors(diarization.diarization_data) }}
                />
              ) : (
                <p>No diarization data available.</p>
              )}
            </div>
          )}

          {activeSection === 'Hearing Case Summary' && (
            <>
             <div className="max-h-[655px] overflow-y-auto">
              {caseBriefs.length > 0 ? (
                <div>
                      {caseBriefs.map((caseBrief, index) => (
                        <div key={index} className="mb-4 p-2 border-b border-gray-300">
                          <h2 className="font-semibold">Case Brief {index + 1}</h2>
                          <p>{caseBrief.generated_caseBrief || 'Case brief content not available'}</p>
                        </div>
                      ))}
                </div>
                    
                  ) : 
                  (
                    <div>
                      <p>No case brief available for this hearing.</p>
                      <button
                        onClick={handleGenerateCaseBrief}
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md"
                      >
                        Generate Case Brief
                      </button>
                    </div>

                
              )}
            </div>
            <button
                onClick={handleDownload}
                className="mt-4 ml-[20%] w-[50%] bg-orange-700 text-white py-4 px-4 rounded hover:bg-orange-800 transition-colors"
              >
                Download Case Brief as PDF
              </button>
            </>
           

            
          )}

          {activeSection === 'Matching Cases' && (
            <div className="grid grid-cols-2 gap-4 mt-8">
       
            <div className=" space-y-4">
            <Link href="https://new.kenyalaw.org/akn/ke/judgment/kehc/2016/6000/eng@2016-03-07">
                  <div className="bg-gray-200 p-2 h-12 w-[70%] rounded-md shadow-sm">
                    Republic v Zacharia Okoth Obado [2018] eKLR....
                  </div>  
                </Link>
              <div className=" p-2 rounded-md w-[70%]  h-12 shadow-sm">
                Republic v Zacharia Okoth Obado [2018] eKLR....
              </div>
              <div className="bg-gray-200 p-2 w-[70%]  h-12 rounded-md shadow-md">
                Republic v Sarah Wairimu Kamotho [2019]....
              </div>
              <div className=" p-2 rounded-md h-12 w-[70%]  shadow-md">
                Republic v Sarah Wairimu Kamotho [2019]....
              </div>
            </div>
            
         
            <div className="space-y-4">
              
                <Link href="https://new.kenyalaw.org/akn/ke/judgment/kehc/2016/6000/eng@2016-03-07">
                  <div className="bg-gray-200 p-2 h-12 w-[70%] rounded-md shadow-sm">
                    Republic v Zacharia Okoth Obado [2018] eKLR....
                  </div>  
                </Link>

              <div className="p-2 rounded-md h-12 w-[70%]  shadow-sm">
                Republic v Sarah Wairimu Kamotho [2019]....
              </div>
              <div className="bg-gray-200 h-12 w-[70%]  p-2 rounded-md shadow-sm">
                Republic v Pascal Ochieng Lawrence [2014] eKLR....
              </div>
              <div className="bg-gray-200 h-12 w-[70%]  p-2 rounded-md shadow-md">
                Republic v Sarah Wairimu Kamotho [2019]....
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
