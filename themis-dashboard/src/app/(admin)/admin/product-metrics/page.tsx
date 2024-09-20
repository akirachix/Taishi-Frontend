'use client';
import useProductMetrics from '../hooks/useProductDashboard';
import DashboardCard from '@/app/(admin)/admin/components/productMetricsCard';
import Layout from '../Layout';
import { useState } from 'react';

const ProductMetrics = () => {
  const { metrics, loading, error } = useProductMetrics();
  const [timeFilter, setTimeFilter] = useState(''); // Initially empty to show all graphs

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

  // Check if metrics is null before rendering
  if (!metrics) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-5">
        <p>No data available</p>
      </div>
    );
  }

  // Function to render the selected chart or all charts initially
  const renderCharts = () => {
    if (!timeFilter) {
      // Show all charts when no filter is selected
      return (
        <>
          <DashboardCard title="Active Users" type="bar" data={metrics.activeUsers} showLegend={true} />
          <DashboardCard title="Active Users Against Signups" type="line" data={metrics.activeUsersVsSignups} />
          <DashboardCard title="Casebriefs Against Processing Time" type="bar" data={metrics.casebriefsVsProcessingTime} />
          <DashboardCard title="Signups Against Casebriefs" type="line" data={metrics.signupsVsCasebriefs} />
        </>
      );
    }

    // Render the selected chart based on the filter
    switch (timeFilter) {
      case 'Active Users':
        return <DashboardCard title="Active Users" type="bar" data={metrics.activeUsers} showLegend={true} />;
      case 'Number of Signups':
        return <DashboardCard title="Active Users Against Signups" type="line" data={metrics.activeUsersVsSignups} />;
      case 'Generated Casebriefs':
        return <DashboardCard title="Casebriefs Against Processing Time" type="bar" data={metrics.casebriefsVsProcessingTime} />;
      case 'Average Processing Time':
        return <DashboardCard title="Signups Against Casebriefs" type="line" data={metrics.signupsVsCasebriefs} />;
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-yellow-800">Product Metrics</h1>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 rounded border border-gray-300"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="">All Metrics</option> {/* Option to reset and show all graphs */}
              <option value="Active Users">Active Users</option>
              <option value="Number of Signups">Number of Signups</option>
              <option value="Generated Casebriefs">Generated Casebriefs</option>
              <option value="Average Processing Time">Average Processing Time</option>
            </select>

            <div className="relative">
              <img src="/notification-bell.png" alt="Notifications" className="w-12 h-12" />
            </div>
            <img src="/profile-picture.png" alt="User Profile" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {renderCharts()}
        </div>

        <div className="mt-4 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold">Overview</h2>
          <p>These are product metrics used to monitor Themis AI performance.</p>
          <ul className="list-disc ml-4 mt-2">
            <li>Active Users</li>
            <li>Number of Signups</li>
            <li>Generated Casebriefs</li>
            <li>Average Processing Time</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProductMetrics;

