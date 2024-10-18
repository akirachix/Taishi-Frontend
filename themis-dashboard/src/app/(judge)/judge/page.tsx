

'use client';
import React, { useEffect, useState } from 'react';
import { Bell, User } from "lucide-react";
import Image from 'next/image';
import Layout from './Layout';
import Link from 'next/link';

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
  const [meetingLink, setMeetingLink] = useState('');

  const handleJoinMeeting = () => {
    console.log('Joining meeting with link:', meetingLink);
  };
     
  const [avatar, setAvatar] = useState('/ladyjustice.png'); // Default avatar

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <Layout>
      <div className="bg-white p-6 flex flex-col">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-yellow-500">Home</h1>
          <div className="flex items-center space-x-6">
            
          <div className="w-12 h-12 nh:w-8 nh:h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
        ) : (
          <User className=" nh:w-4 nh:h-4 text-gray-600" />
        )}
      </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6">Welcome Judge Amani</h2>
            <p className="text-xl mb-6">Enter the link for the virtual hearing to proceed.</p>
            <div className="flex justify-center mb-12">
              <input
                type="text"
                placeholder="Input meeting link"
                className="border border-gray-300 rounded-l-md px-5 py-3 w-96 text-lg"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
              <button
                onClick={handleJoinMeeting}
                className="bg-yellow-500 text-white px-6 py-3 rounded-r-md hover:bg-yellow-600 transition-colors text-lg"
              >
                Join Meeting
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
      </div>
    </Layout>
  );
};

export default JudgeDashboardPage;