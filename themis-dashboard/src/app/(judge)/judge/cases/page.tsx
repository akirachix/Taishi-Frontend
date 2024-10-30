"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Search, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Layout from "../Layout";
import Image from "next/image";


const cases = [
  {
    caseNo: "CASE22465",
    title: "Irungii Khoikho Khamati",
    accuracy: "80%",
    date: "26th August 2023",
    time: "22:45hrs",
    status: "CLOSED CASE",
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
    caseNo: "CASE22475",
    title: "Irungii Khoikho Khamati",
    accuracy: "80%",
    date: "26th August 2023",
    time: "22:45hrs",
    status: "CLOSED CASE",
  },
  {
    caseNo: "CASE595",
    title: "Idi Amin",
    accuracy: "80%",
    date: "2 January 2017",
    time: "13:45hrs",
    status: "OPEN CASE",
  },
  {
    caseNo: "CASE22485",
    title: "Irungii Khoikho Khamati",
    accuracy: "80%",
    date: "26th August 2023",
    time: "22:45hrs",
    status: "CLOSED CASE",
  },
  {
    caseNo: "CASE586",
    title: "Idi Amin",
    accuracy: "80%",
    date: "2 January 2017",
    time: "13:45hrs",
    status: "OPEN CASE",
  },
  {
    caseNo: "CASE22455",
    title: "Irungii Khoikho Khamati",
    accuracy: "80%",
    date: "26th August 2023",
    time: "22:45hrs",
    status: "CLOSED CASE",
  },
  {
    caseNo: "CASE525",
    title: "Idi Amin",
    accuracy: "80%",
    date: "2 January 2017",
    time: "13:45hrs",
    status: "OPEN CASE",
  },
  
];

const statusStyle = (status: string) => {
  switch (status) {
    case "OPEN CASE":
      return "text-[12px] flex justify-center w-24 bg-orange-200 font-extrabold text-orange-800";
    case "CLOSED CASE":
      return "text-[12px] flex justify-center w-24 bg-green-200 font-extrabold text-green-800";
    default:
      return "text-[12px] flex justify-center w-24 bg-orange-200 text-yellow-800";
  }
};

const Cases = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const filteredCases = useMemo(() => {
    return cases.filter(
      (caseItem) =>
        caseItem.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCases = filteredCases.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  const [avatar, setAvatar] = useState('/ladyjustice.png'); // Default avatar

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);
  
  return (
    <Layout>
      <div className="p-4 sm:p-8 bg-white">
      
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#F99D15] mb-4 sm:mb-0">Cases</h1>
          <div className="w-12 h-12 nh:w-8 nh:h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
        {avatar ? (
          <div>
          <Image src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        ) : (
          <User className=" nh:w-4 nh:h-4 text-gray-600" />
        )}
      </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="flex nhm:mt-[10%] items-center nh:p-1 p-2 sm:p-4 border nh:mt-6 mt-36 border-gray-400 rounded-full mb-4 w-full sm:w-2/4">
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

          <div>
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
                {currentCases.length > 0 ? (
                  currentCases.map((caseItem, index) => (
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

            <div className="flex nh:mt-[3%] mt-10 flex-row justify-between nh:p-1 items-center p-4">
              {filteredCases.length > 0 && (
                <>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center text-[#F99D15] disabled:text-gray-600 mt-0"
                  >
                    <ChevronLeft className="mr-2" /> Previous
                  </button>

                  <span className="mx-4">
                    {currentPage} of {Math.ceil(filteredCases.length / itemsPerPage)}
                  </span>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredCases.length / itemsPerPage)}
                    className="flex items-center text-orange-500 disabled:text-gray-300 mt-0"
                  >
                    Next <ChevronRight className="ml-2" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cases;
