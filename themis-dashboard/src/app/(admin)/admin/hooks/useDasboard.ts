import { useState, useEffect } from 'react';


export interface DataPoint {
  name: string;
  value: number;
}


interface MetricsData {
  latency: DataPoint[];
  activeUsers: DataPoint[];
  generatedCaseBriefs: DataPoint[];
  confidenceScore: DataPoint[];
}


const weeklyMetricsData: MetricsData = {
  latency: [
    { name: 'T1', value: 10 },
    { name: 'T2', value: 12 },
    { name: 'T3', value: 8 },
    { name: 'T4', value: 15 },
  ],
  activeUsers: [
    { name: 'Day 1', value: 200 },
    { name: 'Day 2', value: 180 },
    { name: 'Day 3', value: 220 },
    { name: 'Day 4', value: 210 },
  ],
  generatedCaseBriefs: [
    { name: 'T1', value: 5 },
    { name: 'T2', value: 6 },
    { name: 'T3', value: 7 },
    { name: 'T4', value: 8 },
  ],
  confidenceScore: [
    { name: 'Confidence', value: 85 },
    { name: 'Uncertain', value: 15 },
  ],
};

const monthlyMetricsData: MetricsData = {
  latency: [
    { name: 'Month 1', value: 12 },
    { name: 'Month 2', value: 14 },
    { name: 'Month 3', value: 11 },
    { name: 'Month 4', value: 16 },
  ],
  activeUsers: [
    { name: 'Week 1', value: 220 },
    { name: 'Week 2', value: 230 },
    { name: 'Week 3', value: 250 },
    { name: 'Week 4', value: 240 },
  ],
  generatedCaseBriefs: [
    { name: 'Month 1', value: 25 },
    { name: 'Month 2', value: 30 },
    { name: 'Month 3', value: 28 },
    { name: 'Month 4', value: 35 },
  ],
  confidenceScore: [
    { name: 'Confidence', value: 80 },
    { name: 'Uncertain', value: 20 },
  ],
};

const useMetrics = () => {
  const [metrics, setMetrics] = useState<{ weekly: MetricsData; monthly: MetricsData } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
      
        setTimeout(() => {
          setMetrics({ weekly: weeklyMetricsData, monthly: monthlyMetricsData });
          setLoading(false);
        }, 1000); 
      } catch (error) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    metrics,
    loading,
    error,
  };
};

export default useMetrics;
