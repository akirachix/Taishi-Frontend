'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import tinycolor from 'tinycolor2';
import Layout from '@/app/Layout';
import { getSingleTranscription } from '@/app/utils/singleTranscription';
import { fetchDiarization } from '@/app/utils/diarization';

interface Transcription {
    id: number;
    transcription_text: string;
}

interface Diarization {
    diarization_data: string;
}

export default function HearingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const transcriptionId = parseInt(params.id);
    const [transcription, setTranscription] = useState<Transcription | null>(null);
    const [diarization, setDiarization] = useState<Diarization | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('Full Hearing Notes');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const transcriptionData: Transcription = await getSingleTranscription(transcriptionId);
                const diarizationData: Diarization = await fetchDiarization(transcriptionId);

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

    
    const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
      const color = getColorForSpeaker(speaker, speakerColorMap);
      return `<strong style="color: ${color};">${speaker}</strong>`;
    });

    
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