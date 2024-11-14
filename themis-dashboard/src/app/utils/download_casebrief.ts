const url = 'api/get_case_brief_url'

const handleDownloadCaseBrief = async (transcriptionId: number) => {
    try{
        await fetch(`${url}/${transcriptionId}/`)
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