import { useEffect, useState } from 'react';


interface MetricsData {
  activeUsers: { name: string; value: number }[];
  activeUsersVsSignups: { name: string; value: number }[];
  casebriefsVsProcessingTime: { name: string; value: number; value2: number }[];
  signupsVsCasebriefs: { name: string; value: number; value2: number }[];
}

const useProductMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
  
    const mockData: MetricsData = {
      activeUsers: [
        { name: 'Week 1', value: 30 },
        { name: 'Week 2', value: 45 },
        { name: 'Week 3', value: 50 },
        { name: 'Week 4', value: 40 },
        { name: 'Week 5', value: 55 },
      ],
      activeUsersVsSignups: [
        { name: 'Week 1', value: 207 },
        { name: 'Week 2', value: 150 },
        { name: 'Week 3', value: 190 },
        { name: 'Week 4', value: 175 },
        { name: 'Week 5', value: 200 },
      ],
      casebriefsVsProcessingTime: [
        { name: 'Week 1', value: 300, value2: 150 },
        { name: 'Week 2', value: 350, value2: 180 },
        { name: 'Week 3', value: 330, value2: 160 },
        { name: 'Week 4', value: 400, value2: 200 },
        { name: 'Week 5', value: 420, value2: 210 },
      ],
      signupsVsCasebriefs: [
        { name: '2024-08-01', value: 15, value2: 10 },
        { name: '2024-08-02', value: 20, value2: 15 },
        { name: '2024-08-03', value: 25, value2: 18 },
        { name: '2024-08-04', value: 30, value2: 20 },
        { name: '2024-08-05', value: 35, value2: 25 },
      ],
    };

  
    setTimeout(() => {
      setMetrics(mockData);
      setLoading(false);
    }, 1000); 

  }, []);

  return { metrics, loading, error };
};

export default useProductMetrics;

