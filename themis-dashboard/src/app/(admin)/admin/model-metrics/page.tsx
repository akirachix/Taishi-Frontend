'use client';
import { useState } from 'react';
import DashboardCard from '@/app/(admin)/admin/components/modelMetricsCard';
import Layout from '../Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const dummyMetrics = {
  latency: [
    { name: 'Request 1', value: 0.65, date: '2024-09-02' },
    { name: 'Request 2', value: 1.7, date: '2024-09-08' },
    { name: 'Request 3', value: 0.95, date: '2024-09-12' },
    { name: 'Request 4', value: 21.3, date: '2024-09-27' },
    { name: 'Request 4', value: 21.3, date: '2024-10-18' },
    { name: 'Request 5', value: 2.1, date: '2024-10-03' },
    { name: 'Request 6', value: 1.9, date: '2024-10-04' },
    { name: 'Request 7', value: 2.7, date: '2024-10-05' },
    { name: 'Request 8', value: 3.0, date: '2024-10-06' },
  ],
  wordErrorRate: [
    { name: 'English', value: 2, date: '2024-09-02' },
    { name: 'Swahili', value: 6, date: '2024-09-08' },
    { name: 'Long Sentences', value: 3, date: '2024-09-12' },
    { name: 'Noisy Environment', value: 7, date: '2024-10-02' },
    { name: 'English', value: 2, date: '2024-10-05' },
    { name: 'Swahili', value: 6, date: '2024-10-18' },

  ],
  confidenceScore: [
    { name: 'Confident', value: 85, date: '2024-09-02' },
    { name: 'Uncertain', value: 15, date: '2024-10-02' },
    { name: 'Confident', value: 75, date: '2024-09-02' },
    { name: 'Uncertain', value: 25, date: '2024-10-02' },
  ],
  adaptability: [
    { name: 'Other Cases', value: 2, date: '2024-09-02' },
    { name: 'Civil Cases', value: 4, date: '2024-10-02' },
    { name: 'Other Cases', value: 2, date: '2024-09-06' },
    { name: 'Other Cases', value: 2, date: '2024-09-07' },
  ],
};


interface DataItem {
  name: string;
  value: number;
  date: string;
}




const ModelMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('All');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };


const filterDataByDate = (
  data: DataItem[],  
  startDate: Date | null,  
  endDate: Date | null    
) => {
  if (!startDate || !endDate) return data; 

  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate; 
  });
};
  
  const renderCharts = () => {
    const filteredLatency = filterDataByDate(dummyMetrics.latency, startDate, endDate);
    const filteredWER = filterDataByDate(dummyMetrics.wordErrorRate, startDate, endDate);
    const filteredConfidence = filterDataByDate(dummyMetrics.confidenceScore, startDate, endDate);
    const filteredAdaptability = filterDataByDate(dummyMetrics.adaptability, startDate, endDate);
  
    switch (selectedMetric) {
      case 'Latency':
        return <DashboardCard title="Latency (response time)" type="line" data={filteredLatency} />;
      case 'Word Error Rate':
        return <DashboardCard title="Word Error Rate (WER)" type="bar" data={filteredWER} />;
      case 'Confidence Score':
        return <DashboardCard title="Confidence Score" type="pie" data={filteredConfidence} />;
      case 'Adaptability':
        return <DashboardCard title="Adaptability to Case Types" type="bar" data={filteredAdaptability} />;
      default:
        return (
          <>
            <DashboardCard title="Latency (response time)" type="line" data={filteredLatency} />
            <DashboardCard title="Word Error Rate (WER)" type="bar" data={filteredWER} />
            <DashboardCard title="Confidence Score" type="pie" data={filteredConfidence} />
            <DashboardCard title="Adaptability to Case Types" type="bar" data={filteredAdaptability} />
          </>
        );
    }
  };

  return (
    <Layout>
      <div  className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-yellow-800">Model Metrics</h1>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 rounded border border-gray-300"
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

        <div className="flex space-x-4 mb-4">
  <div>
    <label>Start Date: </label>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy/MM/dd"
    />
  </div>
  <div>
    <label>End Date: </label>
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      dateFormat="yyyy/MM/dd"
    />
  </div>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {renderCharts()}
        </div>
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
          <h2 className="font-bold text-[50px]">Overview</h2>
          <p>These are metrics that monitor our model&#39;s performance, highlighting its speed (latency), accuracy (WER), and reliability (confidence score).</p>
        </div>
      </div>
    </Layout>
  );
};

export default ModelMetrics;
