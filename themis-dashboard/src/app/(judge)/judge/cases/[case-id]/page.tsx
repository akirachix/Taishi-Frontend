
"use client";
import React, { useState } from 'react';
import { Bell, ChevronLeft, User } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import Layout from '@/app/Layout';
import Link from 'next/link';

const CaseId = () => {
  const [activeSection, setActiveSection] = useState('Brief Facts');
  const sections = ['Brief Facts', 'Case Issues', 'Evidence', 'Ruling', 'Similar Cases'];
 
  const sectionContent = {
    'Brief Facts': (
      <div>
        <p>
        The applicants lodged the instant application with the European Court of Human Rights on September 6, 2007 challenging the denial of their right to marry as same sex couples.
        In May 2004, the applicants submitted a marriage application to the civil registry department of Bègles municipal council. Following the application, the municipal civil registrar published the banns of marriage. The public prosecutor at the Bordeaux tribunal de grande instance served notice of his objection to the marriage on the municipal civil registrar and the applicants. Despite the objection, the mayor of Bègles performed the marriage ceremony and made an entry to that effect in the register of births, marriages and deaths.
        On June 22, 2004 the public prosecutor brought proceedings against the applicants in the Bordeaux tribunal de grande instance seeking to have the marriage annulled. On 27 July 2004 the court annulled the applicants' marriage and ordered its judgment to be recorded in the margin of their birth certificates and the marriage certificate. The Bordeaux Court of Appeal upheld the judgment. Thereafter, the applicants appealed on points of law to the Court of Cassation which on March 13, 2007 dismissed their appeal.
        Consequently, the applicants brought the instant application. They based their application on articles 12 and 14 of the European Convention on Human Rights, 1953 (Convention). They argued that limiting marriage to opposite sex couples amounted to discrimination and infringed on their right to marry. They contended that they had been discriminated against on the basis of their sexual orientation contrary to articles 8 and 14 of the Convention.
        </p>
      </div>
    ),
    'Case Issues': (
      <div>
        <p>Does the racial segregation of public schools violate the Equal Protection Clause of the Fourteenth Amendment?</p>
      </div>
    ),
    'Evidence': (
      <div>
        <p>This section presents the evidence submitted in the case.</p>
      </div>
    ),
    'Ruling': (
      <div>
        <p>
          They based their application on <b>articles 12 and 14 of the European Convention on Human Rights, 1953 (Convention)</b>.
          They argued that limiting marriage to opposite-sex couples amounted to discrimination and infringed on their right to marry. 
          They contended that they had been discriminated against on the basis of their sexual orientation, contrary to 
          <b>articles 8 and 14 of the Convention</b>.
        </p>
      </div>
    ),
    'Similar Cases': (
      <div className="grid grid-cols-2 gap-4 mt-8">
       
        <div className=" space-y-4">
          <div className="bg-gray-200 p-2 w-[70%]  h-12 rounded-md shadow-sm">
            Republic v Pascal Ochieng Lawrence [2014] eKLR....
          </div>
          <div className=" p-2 rounded-md w-[70%]  h-12 shadow-sm">
            Republic v Zacharia Okoth Obado [2018] eKLR....
          </div>
          <div className="bg-gray-200 p-2 w-[70%]  h-12 rounded-md shadow-md">
            Republic v Sarah Wairimu Kamotho [2019]....
          </div>
          <div className=" p-2 rounded-md h-12 w-[70%]  shadow-md">
            Republic v Sarah Wairimu Kamotho [2019]....
          </div>
        </div>
        
     
        <div className="space-y-4">
          <div className="bg-gray-200 p-2 h-12 w-[70%] rounded-md shadow-sm">
            Republic v Zacharia Okoth Obado [2018] eKLR....
          </div>
          <div className="p-2 rounded-md h-12 w-[70%]  shadow-sm">
            Republic v Sarah Wairimu Kamotho [2019]....
          </div>
          <div className="bg-gray-200 h-12 w-[70%]  p-2 rounded-md shadow-sm">
            Republic v Pascal Ochieng Lawrence [2014] eKLR....
          </div>
          <div className="bg-gray-200 h-12 w-[70%]  p-2 rounded-md shadow-md">
            Republic v Sarah Wairimu Kamotho [2019]....
          </div>
        </div>
      </div>
    ),
  };

  return (
    <Layout>
    <div className="mt-20 ml-4 flex-1 bg-white ">
   
      <div className="nh:mt-[-10%] nh:ml-[86%] flex ml-[88%] mt-[-4] items-center space-x-6">
            <div className="relative bg-[#083317] p-2 rounded-full">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">27</span>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>

      {/* Header */}
      <header className="bg-white p-4 border-b nest-hub:p-3">
        <div className="mt-[-2%] flex items-center">

             <Link href="/cases/">
             <button>
  
          <ChevronLeft size={24} className="mr-2  text-orange-500 disabled:text-gray-300 nesthub:w-5 nesthub:h-5" />
          </button>
           </Link>

          <h1 className="text-[24px]  font-semibold text-orange-500 nh:text-[16px]">
            Joseph Kuria Irungu alias Jowie and Jacqueline Wanjiru Maribe.
          </h1>
        </div>
      </header>

      {/* Case content */}
      <div className="p-4 nh:text-[12px]">
        <h2 className="nh:mt-[-2%] text-xl shadow-md font-semibold mt-2 nh:text-[14px]">Case Introduction</h2>
        <div className="bg-gray-300 ml-4 h-36 rounded-2xl mt-6 w-[80%] shadow-md p-4 mb-4 flex nh:h-20">
          <div className="flex-1 mt-6 ml-8 pr-4 nh:mt-[-1%] border-r border-gray-400 ">
            <h3 className="font-semibold nh:text-[12px]">Jowie Irungu vs Monica Kimani</h3>
            <p className="nh:text-[12px]">Application No. 40183/07</p>
            <p className="nh:text-[12px]">Milimani Law Courts</p>
          </div>
          <div className="flex-1 mt-6 ml-10 pl-4 nh:mt-[-1%] nh:ml-6">
            <p className="nh:text-[12px]">A Nussberger P & J, K Hajiyev, E Mose, A Potocki,
September 6, 2016</p>
            <p className="nh:text-[12px]">Reported by Faith Wanjiku and Betty Nkirote</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-[10%] nh:mt-2   border-b ">
          {sections.map((section) => (
            <button
              key={section}
              className={`py-2 px-4 font-semibold  ${
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
        
        <div className="mt-8 nh:mt-2">
          {sectionContent[activeSection as keyof typeof sectionContent]}
        </div>
      </div>
    </div>
    </Layout> 
  );
};

export default CaseId;


