const url = 'api/serve-audio'

export const fetchAudioFile = async (filename: string) => {
    try {
      const response = await fetch(`${url}/${filename}`);
      if (!response.ok) {
        throw new Error(`Error fetching audio file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob); // Create a URL for the audio blob
      return audioUrl; // Return the URL for the audio element
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  };
  