const url = '/api/transcribed-cases'

export const fetchTranscribedCases = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/transcribed-cases/'); // Adjust the endpoint as needed
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Adjust based on your API response structure
  };