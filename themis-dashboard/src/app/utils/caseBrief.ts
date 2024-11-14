
// const caseBriefUrl = '/api/case_brief/';

// export const fetchCaseBrief = async (id: number) => {
//     try {
//         const response = await fetch(`${caseBriefUrl}${id}`);
//         if (!response.ok) {
//             throw new Error(`Error fetching CaseBrief for transcription ID ${id}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching casebrief:', error);
//         throw error;
//     }
// };


// export const generateCaseBrief = async (transcriptionId: number) => {
//     try {
//       console.log(`Requesting case brief generation for transcription ID: ${transcriptionId}`);
  
//       const response = await fetch(`/api/case_brief`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           transcription: transcriptionId,
//         }),
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API response failed:", errorText);
//         throw new Error(`Error generating case brief: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log("Case brief successfully generated:", data);
//       return data;
  
//     } catch (error) {
//       console.error("Error in generateCaseBrief utility:", error);
//       throw error;
//     }
//   };
  



const caseBriefUrl = '/api/case_brief/';

export const fetchCaseBrief = async (id: number) => {
    try {
        const response = await fetch(`${caseBriefUrl}${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching CaseBrief for transcription ID ${id}`);
        }

        const data = await response.json();
        console.log('DATA :', data);
        
        return data;
    } catch (error) {
        console.error('Error fetching casebrief:', error);
        throw error;
    }
};

// 'POST' method

export const createCaseBrief = async (transcriptionId: number) => {
    try {
        const response = await fetch(`/api/case_brief/${transcriptionId}`, {
            method: 'POST',
        });
  
        if (!response.ok) {
            throw new Error(`Error generating case brief: ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }}