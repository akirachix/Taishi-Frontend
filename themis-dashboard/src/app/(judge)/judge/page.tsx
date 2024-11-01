
"use client";
import React, { useState} from 'react';
import { createTranscription } from '@/app/utils/transcription';

import Image from 'next/image';
import Layout from './Layout';
import Link from 'next/link';

import { getCookie } from 'cookies-next';


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
  const [audioFile,setAudioFile] = useState<File | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [apiError, setApiError] = useState<string | null>(null); 
  const [uploadStatus, setUploadStatus] = useState<string | null>(null); 
  
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files && e.target.files.length > 0){
      setAudioFile(e.target.files[0]);
    }
  }

  // Function for handling transcription creation
  const handleAddCaseAudio = async () => {
    if (!audioFile) {
      setApiError("Please select an audio file.");
      return;
    }

 

    setIsSubmitting(true); 
    setApiError(null); 

    try {
    
      const response = await createTranscription(audioFile, caseName, caseNumber); // 300000ms = 5 minutes timeout
      alert('Transcription process started successfully.');
      setUploadStatus(`Upload successful! Transcription ID: ${response.id}`);
      setShowModal(false)
    } catch (error) {
      console.error('Error creating transcription:', error);
      setApiError('Failed to create transcription.'); 
    } finally {
      setIsSubmitting(false); 
    }
  };

 
  const userData = JSON.parse(getCookie("userData") || "{}");
  const firstName = userData.first_name || "Guest";
  
  

  return (
    <Layout>
      <div className="bg-white flex flex-col">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-500">Home</h1>
        </header>

        <main className="flex-grow flex flex-col">
           <div className="text-center mb-12">
             <h2 className="text-4xl font-semibold mb-6">Welcome {firstName}</h2>
            <p className="text-xl mb-6">Add hearing audio file.</p>
             <div className="flex justify-center mb-12">
            
              <button
            onClick={() => {
              setShowModal(true);  
              setUploadStatus(null);  
            }}
            className="bg-yellow-500 w-[50%] text-white px-4 py-4 rounded-md hover:bg-yellow-600"
          >
            Add Audio
          </button>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-6">Recent Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem, index) => (
                <CaseCard key={index} caseItem={caseItem} />
              ))}
            </div>
          </div>
        </main>

        {/* Upload form for adding case (Modal) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[400px] relative">
              <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>

              {/* Close button (X) */}
              <button
                onClick={() => setShowModal(false)}  
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Case Name Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Case Number Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Number</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Audio File Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Audio File</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  onChange={handleFileChange}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Display API error if it exists */}
              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
              {uploadStatus && <p className="text-green-500 text-sm mb-4">{uploadStatus}</p>}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}  // Close the modal
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  disabled={isSubmitting} // Disable cancel button during submission
                >
                  Close
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
      </div>
    </Layout>
  );
};

export default JudgeDashboardPage;


