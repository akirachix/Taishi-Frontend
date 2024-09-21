'use client';
import { useState } from 'react';
import DashboardCard from '@/app/(admin)/admin/components/modelMetricsCard';
import Layout from '../Layout';


const dummyMetrics = {
  latency: [
    { name: '1', value: 0.65 },
    { name: '2', value: 1.3 },
    { name: '3', value: 1.95 },
    { name: '4', value: 2.6 },
  ],
  wordErrorRate: [
    { name: 'Type A', value: 2 },
    { name: 'Type B', value: 6 },
    { name: 'Type C', value: 3 },
    { name: 'Type D', value: 5 },
    { name: 'Type E', value: 7 },
  ],
  confidenceScore: [
    { name: 'Confident', value: 85 },
    { name: 'Uncertain', value: 15 },
  ],
  adaptability: [
    { name: 'Type A', value: 2 },
    { name: 'Type B', value: 4 },
    { name: 'Type C', value: 3 },
    { name: 'Type D', value: 2 },
    { name: 'Type E', value: 8 },
  ],
};

const ModelMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('All');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  
  const renderCharts = () => {
    switch (selectedMetric) {
      case 'Latency':
        return <DashboardCard title="Latency (response time)" type="line" data={dummyMetrics.latency} />;
      case 'Word Error Rate':
        return <DashboardCard title="Word Error Rate (WER)" type="bar" data={dummyMetrics.wordErrorRate} />;
      case 'Confidence Score':
        return <DashboardCard title="Confidence Score" type="pie" data={dummyMetrics.confidenceScore} />;
      case 'Adaptability':
        return <DashboardCard title="Adaptability to Case Types" type="bar" data={dummyMetrics.adaptability} />;
      default:
        return (
          <>
            <DashboardCard title="Latency (response time)" type="line" data={dummyMetrics.latency} />
            <DashboardCard title="Word Error Rate (WER)" type="bar" data={dummyMetrics.wordErrorRate} />
            <DashboardCard title="Confidence Score" type="pie" data={dummyMetrics.confidenceScore} />
            <DashboardCard title="Adaptability to Case Types" type="bar" data={dummyMetrics.adaptability} />
          </>
        );
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-800">Model Metrics</h1>
          <div className="relative">
            <select
              className="p-2 rounded border border-gray-300 bg-white text-black"
              value={selectedMetric}
              onChange={handleFilterChange}
            >
              <option value="All">All Metrics</option>
              <option value="Latency">Latency (Response Time)</option>
              <option value="Word Error Rate">Word Error Rate</option>
              <option value="Confidence Score">Confidence Score</option>
              <option value="Adaptability">Adaptability to Case Types</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {renderCharts()}
        </div>
        <div className="mt-4 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold">Overview</h2>
          <p>These are metrics that will be used to monitor our model&#39;s performance, highlighting its speed (latency), accuracy (WER), and reliability (confidence score).</p>
        </div>
      </div>
    </Layout>
  );
};

export default ModelMetrics;
