

"use client";

import React, { useState, useMemo } from "react";
import { Search, Bell, User, ChevronLeft, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Link from "next/link";
import Layout from "../Layout";

const HearingsDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  interface PieChartData {
    value: number;
  }
  
  interface Hearing {
    caseNo: string;
    title: string;
    accuracy: string;
    date: string;
    time: string;
    status: string;
    id: number;
  }

  const hearingsData: Omit<Hearing, "id">[] = [
    {
      caseNo: "CASE22465",
      title: "Irungii Khoikho Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "22:45hrs",
      status: "OPEN CASE",
    },
    {
      caseNo: "CASE545",
      title: "Idi Amin",
      accuracy: "80%",
      date: "2 January 2017",
      time: "13:45hrs",
      status: "OPEN CASE",
    },

    {
      caseNo: "CASE22465",
      title: "Irungii Khoikho Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "23:45hrs",
      status: "OPEN CASE",
    },
    {
      caseNo: "CASE12465",
      title: "Ceril Mugasa",
      accuracy: "80%",
      date: "26th March 2023",
      time: "23:45hrs",
      status: " CASE CLOSED",
    },
    {
      caseNo: "CASE22465",
      title: "Irungii Khoikho Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "23:45hrs",
      status: "OPEN CASE",
    },
    {
      caseNo: "CASE21465",
      title: "Amani Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "23:45hrs",
      status: "CASE CLOSED",
    },
    {
      caseNo: "CASE22465",
      title: "Irungii Khoikho Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "23:45hrs",
      status: "OPEN CASE",
    },
    {
      caseNo: "CASE22465",
      title: "Irungii Khoikho Khamati",
      accuracy: "80%",
      date: "26th August 2023",
      time: "23:45hrs",
      status: "OPEN CASE",
    },
  ];

  const hearings = hearingsData.map((hearing, index) => ({
    ...hearing,
    id: index + 1,
  }));

  const filteredHearings = useMemo(() => {
    return hearings.filter(
      (hearing) =>
        hearing.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hearing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hearing.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hearings, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHearings = filteredHearings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const { openCases, closedCases } = useMemo(() => {
    const open = filteredHearings.filter(
      (hearing) => hearing.status === "OPEN CASE"
    ).length;
    const closed = filteredHearings.filter(
      (hearing) => hearing.status === "CASE CLOSED"
    ).length;
    return { openCases: open, closedCases: closed };
  }, [filteredHearings]);

  const totalCases = filteredHearings.length;
  const openPercentage = totalCases
    ? Math.round((openCases / totalCases) * 100)
    : 0;
  const closedPercentage = totalCases
    ? Math.round((closedCases / totalCases) * 100)
    : 0;

  const COLORS = ["#F99D15", "#083317"];

  
  const renderPieChart = (
    data: PieChartData[],
    count: string | number,
    label: string,
    percentage: string | number
  ) => (
    <div className="w-full sm:w-1/2 bg-white rounded-lg shadow p-4 mb-4 sm:mb-0 mr-0 sm:mr-4">
      <div className="flex items-center">
        <ResponsiveContainer width={48} height={48}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={16}
              outerRadius={24}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry: PieChartData, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="ml-2 sm:ml-4">
          <p className="text-2xl sm:text-3xl font-bold">{count}</p>
          <p className="text-gray-500 text-sm sm:text-base">{label}</p>
        </div>
      </div>
      <p className="text-right text-2xl sm:text-3xl font-bold">{percentage}%</p>
    </div>
  );

  return (
    <Layout>
      <div className="p-4 pb-8 sm:p-8 bg-white nh:p-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 nh:h-6 nh:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[#D38816] mb-4 sm:mb-0">
            Hearings
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative bg-[#083317] p-2 rounded-full">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                27
              </span>
            </div>

            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-6 nh:mb-0">
          {renderPieChart(
            [{ value: openCases }, { value: closedCases }],
            openCases,
            "In Progress",
            openPercentage
          )}
          {renderPieChart(
            [{ value: closedCases }, { value: openCases }],
            closedCases,
            "Closed",
            closedPercentage
          )}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center p-2 sm:p-4 border border-gray-400 rounded-full mb-4 w-full sm:w-2/4 nh:h-6 nh:mb-0">
            <Search className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <table className="w-full text-sm sm:text-base nh:h-10 nh:mb-0 nh:text-[14px]">
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
              {currentHearings.slice(0, 4).map((hearing) => (
                <tr
                  key={hearing.id}
                  className={`${
                    hearing.id % 2 === 0 ? "bg-white" : "bg-gray-200"
                  } hover:bg-gray-400 cursor-pointer`}
                >
                  <Link href={`/judge/hearings/${hearing.id}`} className="contents">
                    <td className="p-2 sm:p-3">{hearing.caseNo}</td>
                    <td className="p-2 sm:p-3">{hearing.title}</td>
                    <td className="p-2 sm:p-3">{hearing.accuracy}</td>
                    <td className="p-2 sm:p-3">{hearing.date}</td>
                    <td className="p-2 sm:p-3">{hearing.time}</td>
                    <td className="p-2 sm:p-3">
                      <span
                        className={`px-2 py-1 rounded ${
                          hearing.status === "OPEN CASE" ? "" : "text-gray-800"
                        }`}
                      >
                        {hearing.status}
                      </span>
                    </td>
                  </Link>
                </tr>
              ))}
              {filteredHearings.length === 0 && searchTerm && (
                <div className="text-center py-4 text-red-500 ml-72">
                  No results found for &quot;{searchTerm}&quot;
                </div>
              )}
            </tbody>
          </table>
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 ">
            {filteredHearings.length > 0 && (
              <>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center text-[#F99D15] disabled:text-gray-300 mb-2 sm:mb-0"
                >
                  <ChevronLeft className="mr-2" /> Previous
                </button>
                <span className="mb-2 sm:mb-0">
                  {currentPage} of {Math.ceil(filteredHearings.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(filteredHearings.length / itemsPerPage)
                  }
                  className="flex items-center text-[#F99D15] disabled:text-gray-300"
                >
                  Next <ChevronRight className="ml-2" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HearingsDashboard;
