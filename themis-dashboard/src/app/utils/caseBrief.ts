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