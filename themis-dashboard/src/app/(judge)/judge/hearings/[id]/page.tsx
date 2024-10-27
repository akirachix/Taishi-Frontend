
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { AlertCircle, ArrowLeft } from 'lucide-react';
// import tinycolor from 'tinycolor2';
// import Layout from '../../Layout';
// import { getSingleTranscription } from '@/app/utils/singleTranscription';
// import { fetchDiarization } from '@/app/utils/diarization';  // Import the diarization utility function

// export default function HearingDetailPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const transcriptionId = parseInt(params.id);
//   const [transcription, setTranscription] = useState<any>(null);
//   const [diarization, setDiarization] = useState<any>(null);  // Add state for diarization
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeSection, setActiveSection] = useState('Your Full Meeting Notes');  // Track active tab section

//   // Fetch transcription and diarization data when component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const transcriptionData = await getSingleTranscription(transcriptionId);
//         const diarizationData = await fetchDiarization(transcriptionId);  // Fetch diarization data for the transcription

//         setTranscription(transcriptionData);
//         setDiarization(diarizationData);  // Set diarization data
//       } catch (error) {
//         setError('Failed to fetch transcription or diarization data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [transcriptionId]);

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
//           <p className="text-xl font-semibold text-gray-800 text-center">{error}</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (!transcription) {
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
//           <p className="text-xl font-semibold text-gray-800 text-center">Transcription not found</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Function to format transcription text into paragraphs and bold speaker tags (e.g., Speaker A:)
//   const formatTranscriptionText = (text: string) => {
//     if (!text) return '';
  
//     // Bold the speaker tags (e.g., Speaker A:)
//     const boldSpeakerTags = text.replace(/(Speaker\s[A-Z]:)/g, '<strong>$1</strong>');
  
//     // Split the text into paragraphs based on line breaks (\n or \r\n)
//     const paragraphs = boldSpeakerTags.split(/\n+/).map((paragraph, index) => `<p key=${index} style="margin-bottom: 20px;">${paragraph}</p>`);
  
//     // Return the formatted text as HTML with spaces between paragraphs
//     return paragraphs.join('');
//   };



//   const generateRandomColor = (): string => {
//     return tinycolor.random().toHexString();
//   };
  
//   // Helper function to get a color for a speaker and apply shades
//   const getColorForSpeaker = (speaker: string, speakerColorMap: { [key: string]: { dark: string, light: string } }) => {
//     if (!speakerColorMap[speaker]) {
//       // Generate a random base color for the speaker
//       const baseColor = generateRandomColor();
//       // Create two shades: dark for the speaker tag, light for the dialogue
//       speakerColorMap[speaker] = {
//         dark: tinycolor(baseColor).darken(25).toString(),  // Darker shade for the speaker tag
//         light: tinycolor(baseColor).lighten(35).toString(),  // Lighter shade for the dialogue
//       };
//     }
//     return speakerColorMap[speaker];
//   };
  
//   const formatDiarizationTextWithColors = (text: string) => {
//     if (!text) return '';
  
//     const speakerColorMap: { [key: string]: { dark: string, light: string } } = {}; // To store dark/light shades for each speaker
  
//     // Find all speaker tags and apply their dark/light color styles
//     const colorizedText = text.replace(/\*\*(Speaker\s[A-Z])\*\*/g, (match, speaker) => {
//       const colors = getColorForSpeaker(speaker, speakerColorMap);
//       return `<strong style="color: ${colors.dark}">${speaker}</strong>`;  // Dark color for speaker tag
//     });
  
//     // Split the text into paragraphs based on line breaks (\n or \r\n) and apply light color to dialogues
//     const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
//       // Get speaker tag from the paragraph (if present) to apply matching light shade to the dialogue
//       const speakerMatch = paragraph.match(/\*\*(Speaker\s\d+)\*\*/);
//       const speaker = speakerMatch ? speakerMatch[1] : '';
//       const colors = speaker ? getColorForSpeaker(speaker, speakerColorMap) : { light: '#000000' }; // Default to black if no speaker
  
//       return `<p key=${index} style="color: ${colors.light}; margin-bottom: 16px;">${paragraph}</p>`;  // Light color for dialogue
//     });
  
//     // Return the formatted text as HTML
//     return paragraphs.join('');
//   };




//   return (
//     <Layout>
//       <div className=" md:p-8 bg-white">
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
//                 dangerouslySetInnerHTML={{ __html: formatTranscriptionText(transcription.transcription_text || 'Transcription does not exist') }}
//               />
//             </div>
//           )}

//         {activeSection === 'What Speakers Said' && (
//           <div className="max-h-[755px] overflow-y-auto">
//             {diarization?.diarization_data ? (
//               <div 
//                 className="diarization-text"
//                 dangerouslySetInnerHTML={{ __html: formatDiarizationTextWithColors(diarization.diarization_data) }}  // Use the color format function
//               />
//             ) : (
//               <p>No diarization data available.</p>
//             )}
//           </div>
//         )}

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
import { getSingleTranscription } from '@/app/utils/singleTranscription';
import { fetchDiarization } from '@/app/utils/diarization';

export default function HearingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const transcriptionId = parseInt(params.id);
  const [transcription, setTranscription] = useState<any>(null);
  const [diarization, setDiarization] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Full Hearing Notes');

  // Fetch transcription and diarization data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const transcriptionData = await getSingleTranscription(transcriptionId);
        const diarizationData = await fetchDiarization(transcriptionId);

        setTranscription(transcriptionData);
        setDiarization(diarizationData);
      } catch (error) {
        setError('Failed to fetch transcription or diarization data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transcriptionId]);

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

  if (!transcription) {
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
          <p className="text-xl font-semibold text-gray-800 text-center">Transcription not found</p>
        </div>
      </Layout>
    );
  }

  // Generate random colors for each speaker tag
  const generateRandomColor = (): string => {
    return tinycolor.random().toHexString();
  };

  // Helper function to get a color for each speaker and map it
  const getColorForSpeaker = (speaker: string, speakerColorMap: { [key: string]: string }) => {
    if (!speakerColorMap[speaker]) {
      speakerColorMap[speaker] = generateRandomColor();
    }
    return speakerColorMap[speaker];
  };

  const formatDiarizationTextWithColors = (text: string) => {
    if (!text) return '';

    const speakerColorMap: { [key: string]: string } = {};

    // Find speaker tags (e.g., Speaker 1:) and apply color
    const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
      const color = getColorForSpeaker(speaker, speakerColorMap);
      return `<strong style="color: ${color};">${speaker}</strong>`;
    });

    // Split the text into paragraphs based on line breaks (\n or \r\n)
    const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
      return `<p key=${index} style="color: black; margin-bottom: 16px;">${paragraph}</p>`;
    });

    return paragraphs.join('');
  };

  return (
    <Layout>
      <div className="md:p-8 bg-white">
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">Hearings</h1>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-[10%] border-b">
          {['Full Hearing Notes', 'What Speakers Said'].map((section) => (
            <button
              key={section}
              className={`py-2 px-4 font-semibold ${
                activeSection === section
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-black'
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Content Rendering Based on Active Section */}
        <div className="mt-4">
          {activeSection === 'Full Hearing Notes' && (
            <div className="max-h-[755px] overflow-y-auto">
              <div
                className="transcription-text"
                dangerouslySetInnerHTML={{
                  __html: formatDiarizationTextWithColors(
                    transcription.transcription_text || 'Transcription does not exist'
                  ),
                }}
              />
            </div>
          )}

          {activeSection === 'What Speakers Said' && (
            <div className="max-h-[755px] overflow-y-auto">
              {diarization?.diarization_data ? (
                <div
                  className="diarization-text"
                  dangerouslySetInnerHTML={{
                    __html: formatDiarizationTextWithColors(diarization.diarization_data),
                  }}
                />
              ) : (
                <p>No diarization data available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}