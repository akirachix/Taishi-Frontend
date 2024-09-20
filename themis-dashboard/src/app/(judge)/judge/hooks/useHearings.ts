// import { useState, useEffect } from 'react';
// import { Hearing } from '@/types/hearing';

// export const useHearings = () => {
//   const [hearings, setHearings] = useState<Hearing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchHearings = async () => {
//       try {
//         const response = await fetch('/api/hearings');
//         if (!response.ok) {
//           throw new Error('Failed to fetch hearings');
//         }
//         const data = await response.json();
//         setHearings(data);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An error occurred'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHearings();
//   }, []);

//   return { hearings, loading, error };