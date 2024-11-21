import { NextRequest, NextResponse } from 'next/server';
const transcriptionUrl = process.env.THEMIS_URL;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const audioFile = formData.get("audio_file");
  const caseName = formData.get("case_name");
  const caseNumber = formData.get("case_number");

  if (!audioFile || !caseName || !caseNumber) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
 
    const response = await fetch(`${transcriptionUrl}/api/transcriptions/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail || 'Failed to create transcription' }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating transcription:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}


export async function GET() {
    const transcriptionUrl = process.env.THEMIS_URL;
    console.log({transcriptionUrl})

    try {
        const response = await fetch(`${transcriptionUrl}/api/transcriptions/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.detail || 'Failed to fetch transcriptions' }, { status: response.status });
        }

        const transcriptions = await response.json();
        return NextResponse.json(transcriptions, { status: 200 });
    } catch (error) {
        console.error('Error fetching transcriptions:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}



