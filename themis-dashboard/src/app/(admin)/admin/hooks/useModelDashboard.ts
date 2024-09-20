// src/app/hooks/useModelMetrics.ts
import { useEffect, useState } from 'react';

interface DataPoint {
  name: string;
  value: number;
}

interface Metrics {
  latency: DataPoint[];
  confidenceScore: DataPoint[];
  wordErrorRate: DataPoint[];
  adaptability: DataPoint[];
}

const useModelMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data with the correct structure
        const mockData: Metrics = {
          latency: [
            { name: '1', value: 0.5 },
            { name: '2', value: 1.0 },
            { name: '3', value: 1.5 },
            { name: '4', value: 2.0 },
            { name: '5', value: 2.5 },
          ],
          confidenceScore: [
            { name: 'Confident', value: 85 },
            { name: 'Uncertain', value: 15 },
          ],
          wordErrorRate: [
            { name: 'Type A', value: 3 },
            { name: 'Type B', value: 7 },
            { name: 'Type C', value: 4 },
            { name: 'Type D', value: 5 },
            { name: 'Type E', value: 8 },
          ],
          adaptability: [
            { name: 'Type A', value: 4 },
            { name: 'Type B', value: 6 },
            { name: 'Type C', value: 3 },
            { name: 'Type D', value: 2 },
            { name: 'Type E', value: 7 },
          ],
        };

        setMetrics(mockData); // Set the mock data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch model metrics data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { metrics, loading, error };
};

export default useModelMetrics;
