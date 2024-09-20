'use client';

import React from 'react';
import Image from 'next/image';
import { Home, Briefcase, Calendar,} from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/' },
  { icon: Briefcase, label: 'Model Metrics', path: '/admin/model-metrics' },
  { icon: Calendar, label: 'Product Metrics', path: '/admin/product-metrics' },
  { icon: null, label: 'Profile', path: '/admin/profile' },
];

const Sidebar = () => {
  const { activePath, handleNavigation } = useSidebar();

  return (
    <div className="w-64 bg-[#083317] h-screen text-white p-4 flex flex-col">
      <div className="mb-12 flex justify-center items-center">
        <div className="w-16 h-16 mt-10 flex items-center justify-center">
          <Image
            src="/themislogo.png" 
            alt="Themis.ai Logo"
            width={72}
            height={78}
            className="object-contain"
          />
        </div>
      </div>
      <nav className="space-y-12 flex-grow mt-24 text-[24px]">
        {sidebarItems.map((item) => (
          <div key={item.label} className="relative">
            <button 
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center p-2 w-full text-left transition-colors
                ${activePath === item.path ? 'text-[#F99D15]' : 'text-white'}`}
            >
              {item.icon && (
                <item.icon className={`mr-4 h-5 w-5 ${activePath === item.path ? 'text-[#F99D15]' : 'text-white'}`} />
              )}
              {!item.icon && <div className="w-5 h-5 mr-4" />}
              {item.label}
            </button>
            <div className={`absolute bottom-0 left-9 right-0 w-2/4 h-0.5 ${activePath === item.path ? 'bg-yellow-600' : 'bg-white'}`}></div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;


