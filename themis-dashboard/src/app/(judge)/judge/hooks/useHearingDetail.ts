// // import { useState, useEffect } from 'react';
// // import { HearingDetail } from '@/types/hearing';

// // export const useHearingDetail = (caseNo: string) => {
// //   const [hearingDetail, setHearingDetail] = useState<HearingDetail | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<Error | null>(null);

// //   useEffect(() => {
// //     const fetchHearingDetail = async () => {
// //       try {
// //         const response = await fetch(`/api/hearings/${caseNo}`);
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch hearing detail');
// //         }
// //         const data = await response.json();
// //         setHearingDetail(data);
// //       } catch (err) {
// //         setError(err instanceof Error ? err : new Error('An error occurred'));
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHearingDetail();
// //   }, [caseNo]);

// //   return { hearingDetail, loading, error };
// };