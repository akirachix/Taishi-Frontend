

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { AlertCircle, ArrowLeft } from 'lucide-react';
import Layout from '../../Layout';

interface Hearing {
  id: number; 
  caseNo: string;
  title: string;
  accuracy: string;
  date: string;
  time: string;
  status: string;
}

interface HearingData {
  title: string;
  applicationNo: string;
  court: string;
  judges: string;
  date: string;
  reportedBy: string;
};

interface TranscriptionSpeaker {
  name: string;
  text: string;
};

interface TranscriptionPart {
  part: number;
  duration: string;
  speakers: TranscriptionSpeaker[];
};

const hearings: Hearing[] = [
  {
    id: 1,
    caseNo: "CASE22465",
    title: "Irungii Khoikho Khamati",
    accuracy: "80%",
    date: "26th August 2023",
    time: "22:45hrs",
    status: "OPEN CASE",
  },
];

const hearingData: HearingData = {
  title: "Jowie Irungu vs Monica Kimani",
  applicationNo: "4013/07",
  court: "Milimani Law Courts",
  judges: "A Nussburger P & J. K Huiyee, E Mesa, A Potoch",
  date: "September 6, 2018",
  reportedBy: "Faith Wanjika and Betty Nkuitje"
};

const transcriptionData: TranscriptionPart[] = [
  {
    part: 1,
    duration: '1st 20 minutes',
    speakers: [
      { name: 'Speaker 1', text: 'Live Transcription Live Transcription Live\nTranscription Live Transcription\nLive Transcription Live Transcription\nLive Transcription Live Transcription' },
      { name: 'Speaker 2', text: 'Live Transcription Live Transcription Live\nTranscription Live Transcription\nLive Transcription Live Transcription\nLive Transcription Live Transcription' },
    ]
  },
  {
    part: 2,
    duration: '1st 20 minutes',
    speakers: [
      { name: 'Speaker 1', text: 'Live Transcription Live Transcription Live\nTranscription Live Transcription\nLive Transcription Live Transcription\nLive Transcription Live Transcription' },
      { name: 'Speaker 2', text: 'Live Transcription Live Transcription Live\nTranscription Live Transcription\nLive Transcription Live Transcription\nLive Transcription Live Transcription' },
    ]
  },
];

export default function HearingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const hearingId = parseInt(params.id); 
  const caseDetail = hearings.find((hearing) => hearing.id === hearingId);
  console.log({params});

  if (!caseDetail) {
    return (
    <Layout>
      <div className="flex items-center mb-2 nh:pb-40">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl nh:text-xl font-bold text-[#F99D15]">Hearings</h1>
        </div>
      <div className="flex flex-col items-center justify-center mt-52 p-4 nh:mt-12">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl font-semibold text-gray-800 text-center">Case not found</p>
      </div>
    </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8 bg-white nh:p-1">
        <div className="flex items-center mb-6 nh:mb-0 nh:mt-0">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="text-[#F99D15]" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#F99D15]">Hearings</h1>
        </div>

        <div className="bg-gray-200 p-4 mb-6 rounded-lg nh:mb-0">
          <h2 className="font-bold text-lg md:text-xl mb-2 nh:text-md">{caseDetail.title}</h2>
          <p className="text-sm md:text-base nh:text-[12px]">Case No: {caseDetail.caseNo}</p>
          <p className="text-sm md:text-base nh:text-[12px]">Application No. {hearingData.applicationNo}</p>
          <p className="text-sm md:text-base nh:text-[12px]">{hearingData.court}</p>
          <p className="text-sm md:text-base mt-2 nh:text-[12px] nh:mt-0">{hearingData.judges}</p>
          <p className="text-sm md:text-base nh:text-[12px]">{caseDetail.date} {caseDetail.time}</p>
          <p className="text-sm md:text-base nh:text-[12px]">Status: {caseDetail.status}</p>
          <p className="text-sm md:text-base nh:text-[12px]">Reported by {hearingData.reportedBy}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 nh:h-10 nh:gap-2 nh:text-[12px]">
          {transcriptionData.map((part, index) => (
            <div key={index} className="border p-3 md:p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-base md:text-lg">Part {part.part} ({part.duration})</h3>
              {part.speakers.map((speaker, speakerIndex) => (
                <div key={speakerIndex} className="mb-3 md:mb-4">
                  <p className="font-semibold text-sm md:text-base">{speaker.name}:</p>
                  <p className="whitespace-pre-line text-xs md:text-sm">{speaker.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}