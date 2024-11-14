'use client';
import useProductMetrics from '../hooks/useProductDashboard';
import DashboardCard from '@/app/(admin)/admin/components/productMetricsCard';
import Layout from '../Layout';
import { useState } from 'react';

const ProductMetrics = () => {
  const { metrics, loading, error } = useProductMetrics();
  const [timeFilter, setTimeFilter] = useState(''); 

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


  if (!metrics) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-5">
        <p>No data available</p>
      </div>
    );
  }

  const renderCharts = () => {
    if (!timeFilter) {
   
      return (
        <>
          <DashboardCard title="Active Users" type="bar" data={metrics.activeUsers} showLegend={true} />
          <DashboardCard title="Active Users Against Signups" type="line" data={metrics.activeUsersVsSignups} />
          <DashboardCard title="Casebriefs Against Processing Time" type="bar" data={metrics.casebriefsVsProcessingTime} />
          <DashboardCard title="Signups Against Casebriefs" type="line" data={metrics.signupsVsCasebriefs} />
        </>
      );
    }

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
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-yellow-800">Product Metrics</h1>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 rounded border border-gray-300"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="">All Metrics</option>
              <option value="Active Users">Active Users</option>
              <option value="Number of Signups">Number of Signups</option>
              <option value="Generated Casebriefs">Generated Casebriefs</option>
              <option value="Average Processing Time">Average Processing Time</option>
            </select>

      
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {renderCharts()}
        </div>

        <div className=" p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold">Overview</h2>
          <p>These are product metrics used to monitor Themis AI performance ie active users, number of signups, generated casebriefs, average processing time etc.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductMetrics;

