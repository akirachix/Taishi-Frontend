"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Bell, User, Users } from "lucide-react";
import Layout from "../Layout";
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { fetchTranscriptions } from '@/app/utils/transcription';

// Define the transcription interface
interface Transcription {
  id: number; // Make sure the transcription has an ID for routing
  case_name: string | null;
  case_number: string | null;
  audio_file: string | null;
  status: string | null; // Status field
  date_created: string;
}

const HearingsDashboard: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

  const router = useRouter(); // Initialize router for navigation

  // Fetch transcriptions from backend when the component loads
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

  // Filter transcriptions based on search term
  const filteredTranscriptions = useMemo(() => {
    return transcriptions.filter(
      (transcription) =>
        (transcription.case_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (transcription.case_number?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (transcription.audio_file?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [transcriptions, searchTerm]);

  // // A simple icon for the meetings, this can be expanded if needed
  // const MeetingIcon = () => {
  //   return <Users className="text-green-500" size={24} />;
  // };

  // Function to handle row click and navigate to transcription detail page
  const handleRowClick = (id: number) => {
    router.push(`/judge/hearings/${id}`); // Navigate to transcription detail page
  };

  // Render transcription status with some styling
  const renderStatus = (status: string | null) => {
    let color = "gray"; // Default color
    let text = "Pending"; // Default text

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
          {/* <div className="flex items-center space-x-6">
            <div className="relative bg-[#083317] p-2 rounded-full">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                27
              </span>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div> */}
        </div> }

        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center p-2 sm:p-4 border border-gray-400 rounded-full mb-4 w-full sm:w-2/4 nh:h-6 nh:mb-0">
            <input
              type="text"
              placeholder="Search by case name, case number, or audio file..."
              className="flex-grow outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Set search term from user input
            />
          </div>

          {/* Make the table scrollable */}
          <div className="max-h-[695px] overflow-y-auto"> {/* Add scrollable wrapper */}
            {loading ? (
              <p>Loading transcriptions...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredTranscriptions.length > 0 ? (
              <table className="w-full text-sm sm:text-base nh:text-[14px]">
                <thead className="sticky top-0 bg-gray-100">
                  <tr className="border-b-4 border-[#F99D15]">
                    {/* <th className="p-2 sm:p-3 text-left">Meeting Type</th> */}
                    <th className="p-2 sm:p-3 text-left">CASE NO.</th>
                    <th className="p-2 sm:p-3 text-left">Title</th>
                    <th className="p-2 sm:p-3 text-left">Date</th>
                    <th className="p-2 sm:p-3 text-left">Recording</th>
                    <th className="p-2 sm:p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTranscriptions.map((transcription, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(transcription.id)} // Handle row click
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                      } hover:bg-gray-400 cursor-pointer`} // Add pointer cursor and hover effect
                    >
                      {/* <td className="p-2 sm:p-3">
                        <MeetingIcon />
                      </td> */}
                      <td className="p-2 sm:p-3">{transcription.case_number || "N/A"}</td>
                      <td className="p-2 sm:p-3">{transcription.case_name || "N/A"}</td>
                      <td className="p-2 sm:p-3">{new Date(transcription.date_created).toLocaleDateString()}</td>
                      <td className="p-2 sm:p-3">
                        {transcription.audio_file ? (
                          <a
                            href={transcription.audio_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Listen to Recording
                          </a>
                        ) : (
                          "No recording"
                        )}
                      </td>
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

