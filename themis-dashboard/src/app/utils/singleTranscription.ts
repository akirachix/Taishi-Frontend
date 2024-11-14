const url = '/api/transcription/';

export const getSingleTranscription = async (transcriptionId: number) => {
    try {
        const response = await fetch(`${url}/${transcriptionId}/`);

        if (!response.ok) {
            throw new Error(`Error fetching transcription: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching transcription:", error);
        throw error;
    }
};