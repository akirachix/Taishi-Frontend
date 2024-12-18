"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Layout from "../Layout";
import { useRouter } from 'next/navigation'; 
import { fetchTranscriptions } from '@/app/utils/transcription';


interface Transcription {
  id: number; 
  case_name: string | null;
  case_number: string | null;
  audio_file: string | null;
  status: string | null; 
  date_created: string;
}

const HearingsDashboard: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const router = useRouter(); 

 
  useEffect(() => {
    const loadTranscriptions = async () => {
      try {
        const data = await fetchTranscriptions();
        setTranscriptions(data);
      } catch (error) {
        setError("Failed to load transcriptions.");
      } finally {
        setLoading(false);
      }
    };

    loadTranscriptions();
  }, []);

  const filteredTranscriptions = useMemo(() => {
    return transcriptions.filter(
      (transcription) =>
        (transcription.case_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (transcription.case_number?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (transcription.audio_file?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [transcriptions, searchTerm]);


  const handleRowClick = (id: number) => {
    router.push(`/judge/hearings/${id}`);
  };

  const renderStatus = (status: string | null) => {
    let color = "gray";
    let text = "Pending";

    switch (status) {
      case "in_progress":
        color = "orange";
        text = "In Progress";
        break;
      case "completed":
        color = "green";
        text = "Completed";
        break;
      case "failed":
        color = "red";
        text = "Failed";
        break;
      default:
        break;
    }

    return <span className={`text-${color}-500 font-semibold`}>{text}</span>;
  };

  return (
    <Layout>
      <div className="p-4 pb-8 sm:p-8 bg-white nh:p-2">
        {<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 nh:h-6 nh:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[#D38816] mb-4 sm:mb-0">
            Hearings
          </h1>
        </div> }

        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center p-2 sm:p-4 border border-gray-400 rounded-full mb-4 w-full sm:w-2/4 nh:h-6 nh:mb-0">
            <input
              type="text"
              placeholder="Search by case name, case number, or audio file..."
              className="flex-grow outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

      
          <div className="max-h-[695px] overflow-y-auto"> 
            {loading ? (
              <p>Loading transcriptions...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredTranscriptions.length > 0 ? (
              <table className="w-full text-sm sm:text-base nh:text-[14px]">
                <thead className="sticky top-0 bg-gray-100">
                  <tr className="border-b-4 border-[#F99D15]">
                    <th className="p-2 sm:p-3 text-left">CASE NO.</th>
                    <th className="p-2 sm:p-3 text-left">Title</th>
                    <th className="p-2 sm:p-3 text-left">Date</th>
                    <th className="p-2 sm:p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTranscriptions.map((transcription, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(transcription.id)} 
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                      } hover:bg-gray-400 cursor-pointer`}
                    >
                      
                      <td className="p-2 sm:p-3">{transcription.case_number || "N/A"}</td>
                      <td className="p-2 sm:p-3">{transcription.case_name || "N/A"}</td>
                      <td className="p-2 sm:p-3">{new Date(transcription.date_created).toLocaleDateString()}</td>

                      <td className="p-2 sm:p-3">{renderStatus(transcription.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 text-red-500">
                No transcriptions match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HearingsDashboard;

