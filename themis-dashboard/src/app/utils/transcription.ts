const transcriptionUrl = '/api/transcriptions/';

export const createTranscription = async (
  audioFile: File,
  caseName: string,
  caseNumber: string,
  retries = 5,
  delay = 2000
) => {
  let attempt = 0;

  const formData = new FormData();
  formData.append('audio_file', audioFile);
  formData.append('case_name', caseName);
  formData.append('case_number', caseNumber);


  const makeRequest = async () => {
    try {
      const response = await fetch(transcriptionUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error submitting transcription: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error on attempt ${attempt + 1}: ${error}`);
      throw error;
    }
  };


  while (attempt < retries) {
    try {
      return await makeRequest();
    } catch (error) {
      if (attempt < retries - 1) {
  
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        attempt++;
        delay *= 2; 
      } else {
  
        throw new Error(`All attempts to submit transcription failed after ${retries} retries.`);
      }
    }
  }
};

export const pollTranscriptionStatus = async (transcriptionId: number, retries = 5, delay = 5000) => {
  let attempt = 0;

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${transcriptionUrl}${transcriptionId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching transcription status: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`Error fetching transcription status on attempt ${attempt + 1}: ${error}`);
      throw error;
    }
  };


  while (attempt < retries) {
    try {
      const status = await fetchStatus();


      if (status.status === 'completed') {
        return status; 
      }

      console.log(`Transcription still in progress, retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
      delay *= 1.5; 

    } catch (error) {
      if (attempt < retries - 1) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        attempt++;
        delay *= 1.5; 
      } else {
        throw new Error(`All attempts to fetch transcription status failed after ${retries} retries.`);
      }
    }
  }
};

export async function fetchTranscriptions() {
  try {
    const response = await fetch(transcriptionUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch transcriptions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    throw error;
  }
}
