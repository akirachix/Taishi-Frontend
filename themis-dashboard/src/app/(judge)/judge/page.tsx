"use client";
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { fetchTranscriptions, createTranscription } from '@/app/utils/transcription';
import Link from 'next/link';

interface Transcription {
  id: number;
  case_name: string | null;
  case_number: string | null;
  date_created: string;
}

const CaseCard = ({ caseItem }: { caseItem: Transcription }) => (
  <Link href={`/judge/hearings/${caseItem.id}`} className="contents">
    <div className="bg-green-100 shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{caseItem.case_name || "N/A"}</h3>
      <p className="text-sm text-gray-700 mb-2">
        Case No: {caseItem.case_number || "N/A"}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Date: {new Date(caseItem.date_created).toLocaleDateString()}
      </p>
    </div>
  </Link>
);

const JudgeDashboardPage = () => {
  const [cases, setCases] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [showModal, setShowModal] = useState(false);
  const [caseName, setCaseName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);


  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchTranscriptions();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setError("Failed to fetch recent cases.");
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

 
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
      const response = await createTranscription(audioFile, caseName, caseNumber);
      alert('Transcription process started successfully.');
      setUploadStatus(`Upload successful! Transcription ID: ${response.id}`);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating transcription:', error);
      setApiError('Failed to create transcription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white flex flex-col">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-500">Home</h1>
        </header>

        <main className="flex-grow flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6">Welcome Guest</h2>
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
            {loading ? (
              <p>Loading recent cases...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : cases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cases .slice(-6)
                 .reverse() 
                 .map((caseItem) => (
                  <CaseCard key={caseItem.id} caseItem={caseItem} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent cases found.</p>
            )}
          </div>
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[400px] relative">
              <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>

            
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

           
              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
              {uploadStatus && <p className="text-green-500 text-sm mb-4">{uploadStatus}</p>}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  disabled={isSubmitting}
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
