// const url = 'api/get_case_brief_url'


// const handleDownloadCaseBrief = async (transcriptionId: number) => {
//     try {
//         // Fetch the PDF URL from the Next.js API route
//         const response = await fetch(`${url}/${transcriptionId}/`);

//         if (!response.ok) {
//             throw new Error('Failed to retrieve PDF URL');
//           }
        
//           const data = await response.json();
//           const pdfUrl = data.pdf_url;
        
//           // Trigger the download using the fetched URL
//           const link = document.createElement('a');
//           link.href = pdfUrl;
//           link.download = `case_brief_${transcriptionId}.pdf`; // Set the filename for the downloaded file
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link); // Clean up the DOM after triggering download
//         } 
        
//         catch (error) {
//             console.error('Error downloading case brief:', error);
//             throw error;
//         }
//         };


const url = 'api/get_case_brief_url'

const handleDownloadCaseBrief = async (transcriptionId: number) => {
    try{
        const response = await fetch(`${url}/${transcriptionId}/`)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `case_brief_${transcriptionId}.pdf`;
          link.click();
        })

    }
    catch(error){ 
        console.error('Error downloading case brief:', error);
    }
  }
  


export default handleDownloadCaseBrief;