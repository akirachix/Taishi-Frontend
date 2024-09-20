'use client';
import useMetrics from './hooks/useDasboard';
import DashboardCard from '@/app/(admin)/admin/components/adminDashboardCard';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFilter, faBell } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';

const Dashboard = () => {
  const { metrics, loading, error } = useMetrics();
  const [timeFilter, setTimeFilter] = useState('Weekly'); // State for the time filter

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-5">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Determine the data set to display based on the selected filter
  const selectedData = timeFilter === 'Weekly' ? metrics?.weekly : metrics?.monthly;

  return (
    <Layout>
      <div className="p-5">
        {/* Header section with filter and profile */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-yellow-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Time filter dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setTimeFilter((prev) => (prev === 'Weekly' ? 'Monthly' : 'Weekly'))}
                className="flex items-center px-4 py-2 bg-gray-100 border border-black rounded-full text-black hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                {timeFilter}
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
            </div>
            {/* Notification bell and profile picture */}
            <div className="relative">
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">12</span>
              <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-700" />
            </div>
            <img src="/profile-picture.png" alt="User Profile" className="w-10 h-10 rounded-full border-2 border-gray-300" />
          </div>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {selectedData ? (
            <>
              <DashboardCard title="Latency" type="line" data={selectedData.latency} />
              <DashboardCard title="Active Users" type="line" data={selectedData.activeUsers} />
              <DashboardCard title="Generated Case Briefs" type="bar" data={selectedData.generatedCaseBriefs} />
              <DashboardCard title="Confidence Score" type="pie" data={selectedData.confidenceScore} />
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* Bottom card for the overview */}
        <div className="mt-4 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold">Overview</h2>
          <p>These are product metrics used to monitor the performance of Themis AI.</p>
          <ul className="list-disc ml-4 mt-2">
            <li>Active Users</li>
            <li>Latency</li>
            <li>Generated Case Briefs</li>
            <li>Confidence Score</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
