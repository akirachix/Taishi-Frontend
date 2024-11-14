
const diarizationUrl = '/api/diarization/';

export const fetchDiarization = async (id: number) => {
    try {
        const response = await fetch(`${diarizationUrl}${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching diarization for transcription ID ${id}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching diarization:', error);
        throw error;
    }
};
