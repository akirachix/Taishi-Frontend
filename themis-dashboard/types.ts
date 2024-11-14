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

  export interface CaseLaw{
    title: string;
    link: string;
  }

  export interface CaseBrief{
    generated_caseBrief : string
  }

  export interface Hearing{
    transcription_text  : string
  }

  export interface Speaker_tagging{
    diarization_data : string
  }