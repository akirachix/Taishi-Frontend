const url = 'api/case_briefs'



export async function fetchTranscriptions() {
    try {
      const response = await fetch(url, {
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
  