
// // const caseMatchingUrl = '/api/case_matching/';

// // export const fetchCaseLaw = async (id: number) => {
// //     try {
// //         const response = await fetch(`${caseMatchingUrl}${id}`);
// //         if (!response.ok) {
// //             throw new Error(`Error fetching case law for transcription ID ${id}`);
// //         }

// //         const data = await response.json();
// //         // console.log(`Generated DATA: ${JSON.stringify(data)}`);
        
// //         return data;
// //     } catch (error) {
// //         console.error('Error fetching case law:', error);
// //         throw error;
// //     }
// // };

// export const fetchCaseLaw = async (transcriptionId: number, generate?: boolean) => {
//     const url = `/api/case_matching/${transcriptionId}${generate ? '?generate=true' : ''}`;
    
//     const response = await fetch(url, {
//       method: generate ? 'POST' : 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch or generate case laws');
//     }
  
//     return await response.json();
//   };


//   export const createCaseLaws = async (transcriptionId: number) => {
//     try {
//         const response = await fetch(`/api/case_matching/${transcriptionId}`, {
//             method: 'POST',
//         });
  
//         if (!response.ok) {
//             throw new Error(`Error generating case laws: ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(`Error: ${error}`);
//         throw error;
//     }
//   };


// 'GET' method

const caseMatchingUrl = '/api/case_matching/';

export const fetchCaseLaw = async (id: number) => {
    try {
        const response = await fetch(`${caseMatchingUrl}${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching case law for transcription ID ${id}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching case law:', error);
        throw error;
    }
};


// 'POST' method

export const createCaseLaws = async (transcriptionId: number) => {
  try {
      const response = await fetch(`/api/case_matching/${transcriptionId}`, {
          method: 'POST',
      });

      if (!response.ok) {
          throw new Error(`Error generating case laws: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error(`Error: ${error}`);
      throw error;
  }
};