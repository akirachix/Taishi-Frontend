"use client"

import React, { useState } from 'react';
import { Bell, User } from "lucide-react";
import Link from "next/link";
import Layout from './Layout';
import { getFirstThreeCases } from './cases/data/cases';

const statusStyle = (status: string) => {
  switch (status) {
    case "OPEN CASE":
      return "text-[12px] nh:text-[10px] flex justify-center w-24 bg-orange-200 font-extrabold text-orange-800 py-1"; 
    case "CLOSED CASE":
      return "text-[12px]  nh:text-[10px] flex justify-center w-24 bg-green-200 font-extrabold text-green-800 py-1"; 
    default:
      return "text-[12px] flex justify-center w-24 bg-orange-200 text-yellow-800 py-1"; 
  }
};

const JudgeDashboardPage = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const cases = getFirstThreeCases();

  const handleJoinMeeting = () => {
    console.log('Joining meeting with link:', meetingLink);
  };

  return (
    <Layout>
      <div className="bg-white nh:p-0 flex flex-col">
        <header className="flex justify-between items-center mb-8 nh:mb-0">
          <h1 className="text-2xl nh:text-lg font-bold text-yellow-500">Home</h1>
          <div className="flex items-center space-x-4 nh:space-x-2">
            <div className="relative">
              <div className="rounded-full w-12 h-12 nh:w-8 nh:h-8 bg-green-800 flex items-center justify-center">
                <Bell className="h-6 w-6 nh:h-4 nh:w-4 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs nh:text-[8px] rounded-full h-5 w-5 nh:h-3 nh:w-3 flex items-center justify-center">12</span>
            </div>
            <div className="w-12 h-12 nh:w-8 nh:h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 nh:w-4 nh:h-4 text-gray-600" />
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          <div className="text-center mb-10">
            <h2 className=" xl:text-4xl mt-10  nh:text-[24px] nm:text-[20px] font-semibold mb-12">Welcome Judge Amani</h2>
            <p className="text-xl nh:text-sm nm:text-lg mb-12 nh:mb-2">Enter the link for the virtual hearing to proceed.</p>
            <div className="flex justify-center mb-10">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Input meeting link"
                  className="border border-gray-300 rounded-l-md px-4 py-2 w-[40rem] nh:w-[30rem] text-lg nh:text-sm"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
                <button
                  onClick={handleJoinMeeting}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors text-lg nh:text-sm whitespace-nowrap "
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-3xl nh:text-xl nm:text-[20px] font-semibold ">Recent Cases</h3>
            <div className="overflow-x-auto">
              <table className="nh:mt-2 w-full lg:mt-10 text-sm sm:text-base nh:text-[12px]">
                <thead>
                  <tr className="bg-gray-100 border-b-4 border-[#F99D15]">
                    <th className="p-2 sm:p-3 text-left">CASE NO.</th>
                    <th className="p-2 sm:p-3 text-left">Title</th>
                    <th className="p-2 sm:p-3 text-left">Accuracy</th>
                    <th className="p-2 sm:p-3 text-left">Date</th>
                    <th className="p-2 sm:p-3 text-left">Time</th>
                    <th className="p-2 sm:p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.length > 0 ? (
                    cases.map((caseItem, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"} hover:bg-gray-400 cursor-pointer`}
                      >
                        <Link href={`/judge/cases/${caseItem.caseNo}`} className="contents">
                          <td className="p-3 sm:p-3">{caseItem.caseNo}</td>
                          <td className="p-3 sm:p-3">{caseItem.title}</td>
                          <td className="p-3 sm:p-3">{caseItem.accuracy}</td>
                          <td className="p-3 sm:p-3">{caseItem.date}</td>
                          <td className="p-3 sm:p-3">{caseItem.time}</td>
                          <td className="p-3 sm:p-3">
                            <span className={`px-2 py-1 flex justify-center w-28 rounded ${statusStyle(caseItem.status)}`}>
                              {caseItem.status}
                            </span>
                          </td>
                        </Link>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4">
                        No cases found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default JudgeDashboardPage;