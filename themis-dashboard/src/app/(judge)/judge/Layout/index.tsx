"use client";
import React from "react";

import { Metadata } from "next";
import Sidebar from "../components/Sidebar";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full ">
      <div className="w-64 bg-[#083317] text-white h-[100px] ">
       <Sidebar/>
      </div>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}