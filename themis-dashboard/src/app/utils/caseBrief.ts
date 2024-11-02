
const caseBriefUrl = '/api/case_brief/';

export const fetchCaseBrief = async (id: number) => {
    try {
        const response = await fetch(`${caseBriefUrl}${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching CaseBrief for transcription ID ${id}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching casebrief:', error);
        throw error;
    }
};
