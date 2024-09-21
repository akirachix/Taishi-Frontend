'use client';
import useMetrics from './hooks/useDasboard';
import DashboardCard from '@/app/(admin)/admin/components/adminDashboardCard';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';

const Dashboard = () => {
  const { metrics, loading, error } = useMetrics();
  const [timeFilter, setTimeFilter] = useState('Weekly'); 
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

  const selectedData = timeFilter === 'Weekly' ? metrics?.weekly : metrics?.monthly;

  return (
    <Layout>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
          
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
          </div>
        </div>

     
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
        <div className="mt-2 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold">Overview</h2>
          <p>These are a cllection of metrics used to monitor Themis AI including model metrics and product metrics.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
