

// 'use client';
// import React, { useState } from 'react';
// import { Bell, User } from "lucide-react";
// import Image from 'next/image';
// import Layout from './Layout';
// import Link from 'next/link';

// interface Case {
//   caseNo: string;
//   title: string;
//   date: string;
//   Recording: string;
//   meetingType: 'google-meet' | 'ms-teams';
// }

// const cases: Case[] = [
//   {
//     caseNo: "CASE22465",
//     title: "Irungii Khoikho Khamati",
//     date: "26th August 2023",
//     Recording: "Opening_Statement.mp3",
//     meetingType: "google-meet",
//   },
//     {
//     caseNo: "CASE545",
//     title: "Idi Amin",
//     date: "2 January 2017",
//     Recording: "No recording",
//     meetingType: "google-meet",
//   },
//   {
//     caseNo: "CASE22465",
//     title: "Irungii Khoikho Khamati",
//     date: "26th August 2023",
//     Recording: "No recording",
//     meetingType: "ms-teams",
//   },
//   {
//     caseNo: "CASE12465",
//     title: "Ceril Mugasa",
//     date: "26th March 2023",
//     Recording: "No recording",
//     meetingType: "ms-teams",
//   },
//   {
//     caseNo: "CASE22465",
//     title: "Irungii Khoikho Khamati",
//     date: "26th August 2023",
//     Recording: "No recording",
//     meetingType: "ms-teams",
//   },
//   {
//     caseNo: "CASE21465",
//     title: "Amani Khamati",
//     date: "26th August 2023",
//     Recording: "No recording",
//     meetingType: "google-meet",
//   },
  

// ];

// const MeetingIcon = ({ type }: { type: Case['meetingType'] }) => {
//   const iconSrc = type === 'google-meet' ? "/images/google-meet-icon.png" : "/images/ms-teams-icon.png";
//   const altText = type === 'google-meet' ? "Google Meet" : "Microsoft Teams";
  
//   return (
//     <Image
//       src={iconSrc}
//       alt={altText}
//       width={24}
//       height={24}
//     />
//   );
// };

// const CaseCard = ({ caseItem }: { caseItem: Case }) => (
 
//  <Link href={`/judge/cases/${caseItem.caseNo}`} className="contents">
//   <div className=" bg-green-100 shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow">
//     <div className="flex items-center mb-3">
//       <MeetingIcon type={caseItem.meetingType} />
//       <span className="ml-3 font-semibold">{caseItem.caseNo}</span>
//     </div>
//     <h3 className="text-xl font-semibold mb-3">{caseItem.title}</h3>
//     <p className="text-sm text-gray-700 mb-2">Date: {caseItem.date}</p>
//     <p className="text-sm text-gray-700">Recording: {caseItem.Recording}</p>
//   </div>
//   </Link>
// );

// const JudgeDashboardPage = () => {
//   const [meetingLink, setMeetingLink] = useState('');

//   const handleJoinMeeting = () => {
//     console.log('Joining meeting with link:', meetingLink);
//   };

//   return (
//     <Layout>
//       <div className="bg-white p-6 flex flex-col">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-yellow-500">Home</h1>
//           <div className="flex items-center space-x-6">
            
//             <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
//               <User className="w-7 h-7 text-gray-600" />
//             </div>
//           </div>
//         </header>

//         <main className="flex-grow flex flex-col">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-semibold mb-6">Welcome Judge Amani</h2>
//             <p className="text-xl mb-6">Enter the link for the virtual hearing to proceed.</p>
//             <div className="flex justify-center mb-12">
//               <input
//                 type="text"
//                 placeholder="Input meeting link"
//                 className="border border-gray-300 rounded-l-md px-5 py-3 w-96 text-lg"
//                 value={meetingLink}
//                 onChange={(e) => setMeetingLink(e.target.value)}
//               />
//               <button
//                 onClick={handleJoinMeeting}
//                 className="bg-yellow-500 text-white px-6 py-3 rounded-r-md hover:bg-yellow-600 transition-colors text-lg"
//               >
//                 Join Meeting
//               </button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-3xl font-semibold mb-6">Recent Cases</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {cases.map((caseItem, index) => (
//                 <CaseCard key={index} caseItem={caseItem} />
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default JudgeDashboardPage;



"use client";
import React, { useState } from 'react';
import { createTranscription, pollTranscriptionStatus } from '@/app/utils/transcription'; // Ensure this is the correct path to the utility function
import Layout from './Layout';
import Link from 'next/link';
import Image from 'next/image';

interface Case {
  caseNo: string;
  title: string;
  date: string;
  Recording: string;
  meetingType: 'google-meet' | 'ms-teams';
}

const cases: Case[] = [
  {
    caseNo: "CASE22465",
    title: "Irungii Khoikho Khamati",
    date: "26th August 2023",
    Recording: "Opening_Statement.mp3",
    meetingType: "google-meet",
  },
    {
    caseNo: "CASE545",
    title: "Idi Amin",
    date: "2 January 2017",
    Recording: "No recording",
    meetingType: "google-meet",
  },
  {
    caseNo: "CASE22465",
    title: "Irungii Khoikho Khamati",
    date: "26th August 2023",
    Recording: "No recording",
    meetingType: "ms-teams",
  },
  {
    caseNo: "CASE12465",
    title: "Ceril Mugasa",
    date: "26th March 2023",
    Recording: "No recording",
    meetingType: "ms-teams",
  },
  {
    caseNo: "CASE22465",
    title: "Irungii Khoikho Khamati",
    date: "26th August 2023",
    Recording: "No recording",
    meetingType: "ms-teams",
  },
  {
    caseNo: "CASE21465",
    title: "Amani Khamati",
    date: "26th August 2023",
    Recording: "No recording",
    meetingType: "google-meet",
  },
  

];

const MeetingIcon = ({ type }: { type: Case['meetingType'] }) => {
  const iconSrc = type === 'google-meet' ? "/images/google-meet-icon.png" : "/images/ms-teams-icon.png";
  const altText = type === 'google-meet' ? "Google Meet" : "Microsoft Teams";
  
  return (
    <Image
      src={iconSrc}
      alt={altText}
      width={24}
      height={24}
    />
  );
};

const CaseCard = ({ caseItem }: { caseItem: Case }) => (
 
  <Link href={`/judge/cases/${caseItem.caseNo}`} className="contents">
   <div className=" bg-green-100 shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow">
     <div className="flex items-center mb-3">
       <MeetingIcon type={caseItem.meetingType} />
       <span className="ml-3 font-semibold">{caseItem.caseNo}</span>
     </div>
     <h3 className="text-xl font-semibold mb-3">{caseItem.title}</h3>
     <p className="text-sm text-gray-700 mb-2">Date: {caseItem.date}</p>
     <p className="text-sm text-gray-700">Recording: {caseItem.Recording}</p>
   </div>
   </Link>
 );

const JudgeDashboardPage = () => {
  const [caseName, setCaseName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null); // Store the local file
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [apiError, setApiError] = useState<string | null>(null); 
  const [uploadStatus, setUploadStatus] = useState<string | null>(null); // To track the status of the upload

  const [meetingLink, setMeetingLink] = useState('');

  const handleJoinMeeting = () => {
    console.log('Joining meeting with link:', meetingLink);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleAddCaseAudio = async () => {
    if (!audioFile) {
      setApiError("Please select an audio file.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Create transcription and get the transcription ID
      const transcriptionId = await createTranscription(audioFile, caseName, caseNumber);
      setUploadStatus(`Transcription started. Waiting for results...`);

      // Poll the backend every 10 seconds, up to 10 times (total 100 seconds)
      const transcription = await pollTranscriptionStatus(transcriptionId, 10000, 10);

      // Display the transcription result once completed
      setUploadStatus(`Transcription completed! Text: ${transcription.transcription_text}`);
    } catch (error) {
      console.error("Error during transcription:", error);
      setApiError("Failed to complete transcription.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false); // Close modal after submission
    }
  };

  return (
    <Layout>
      <div className="bg-white flex flex-col">
      <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-yellow-500">Home</h1>
          <div className="flex items-center space-x-6">
            
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
              {/* <User className="w-7 h-7 text-gray-600" /> */}
            </div>
          </div>
        </header>

        <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-6">Welcome Judge Amani</h2>
        <p className="text-xl mb-6">Enter the link for the virtual hearing to proceed.</p>
       
        {/* Add button to trigger modal */}
        <div className="mb-4 flex justify-center">
        <input
                type="text"
                // placeholder="Input meeting link"
                className="border border-gray-300 rounded-l-md px-5 py-3 w-96 text-lg"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 text-white px-6 py-3 rounded-r-md hover:bg-yellow-600 transition-colors text-lg"
          >
            Add Audio
          </button>
        </div>

        </div>
        

        {/* Upload form for adding case */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[400px]">
              <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Number</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Audio File</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Display API error if it exists */}
              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
              {uploadStatus && <p className="text-green-500 text-sm mb-4">{uploadStatus}</p>}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCaseAudio}
                  className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Transcribing Audio...' : 'Add Audio'}
                </button>
              </div>
            </div>

          

          </div>
        )}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Recent Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem, index) => (
                <CaseCard key={index} caseItem={caseItem} />
              ))}
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default JudgeDashboardPage;
