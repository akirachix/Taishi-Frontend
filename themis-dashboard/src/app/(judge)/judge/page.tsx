

"use client";

import React, { useState } from "react";
import { Bell, User } from "lucide-react";
import Layout from "./Layout";

const Homecomponent = () => {
  const [meetingLink, setMeetingLink] = useState("");

  const handleJoinMeeting = () => {
    console.log("Joining meeting with link:", meetingLink);
  };

  return (
    <Layout>
    <div className="flex-1 p-4 md:p-6 bg-white nh:pb-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="text-[#F99D15] font-semibold text-3xl md:text-[40px]">
          Home
        </div>
        <div className="flex items-center space-x-2 md:space-x-4 w-16 h-16 md:w-24 md:h-24">
          <div className="relative">
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center">
              6
            </span>
          </div>
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="max-w-sm md:max-w-lg mx-auto rounded-lg mt-12 md:mt-24 w-full">
        <div className="p-6 nh:p-6">
          <h2 className="text-2xl md:text-[40px] font-bold text-center mb-6 md:mb-12 whitespace-nowrap  text-overflow-ellipsis">
            Welcome Judge Amani
          </h2>
          <p className="mb-4 md:mb-6 text-center text-gray-600 text-sm md:text-base">
            Enter the link for the virtual hearing for you to proceed.
          </p>

          <input
            type="text"
            placeholder="Input meeting link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="w-full md:w-[406px] p-2 border border-gray-300 rounded-lg mb-4 md:mb-6 md:ml-8"
          />
        </div>
        <button
          onClick={handleJoinMeeting}
          className="w-full md:w-[231px] p-2 bg-[#083317] hover:bg-green-800 text-white rounded md:ml-[25%]"
        >
          Join Meeting
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default Homecomponent;
