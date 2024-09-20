export interface Hearing {
    id:number;
    caseNo: string;
    title: string;
    accuracy: string;
    date: string;
    time: string;
    status: 'OPEN CASE' | 'CASE CLOSED';
  }
  
  export interface HearingDetail extends Hearing {
    applicationNo: string;
    court: string;
    judges: string;
    reportedBy: string;
    transcription: {
      part: number;
      duration: string;
      speakers: {
        name: string;
        text: string;
      }[];
    }[];
  }