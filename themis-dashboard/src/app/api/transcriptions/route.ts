import { NextRequest, NextResponse } from 'next/server';
const transcriptionUrl = process.env.THEMIS_URL;
// Function to handle POST request (create transcription)
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const audioFile = formData.get("audio_file");
  const caseName = formData.get("case_name");
  const caseNumber = formData.get("case_number");

  if (!audioFile || !caseName || !caseNumber) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // POST to the Django backend (ensure you have the correct URL to your Django API)
    const response = await fetch(`${transcriptionUrl}/api/transcriptions/`, {
      method: "POST",
      body: formData,
    });

    // If the response is not ok, throw an error
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



// import { NextRequest, NextResponse } from 'next/server';
// import { fetchWithTimeout } from '@/app/utils/fetchWithTimeout';

// export async function POST(request: NextRequest) {
//   const transcriptionUrl = process.env.THEMIS_URL;

//   try {
//     const { case_name, case_number, audio_file } = await request.json();

//     if (!case_name || !case_number || !audio_file) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     const response = await fetchWithTimeout(`${transcriptionUrl}/api/transcriptions/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ case_name, case_number, audio_file }),
//     }, 100000); // Set timeout for 60 seconds (or as long as needed)

//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json({ error: errorData.detail || 'Failed to create transcription' }, { status: response.status });
//     }

//     const result = await response.json();
//     return NextResponse.json(result, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
//   }
// }





export async function GET() {
    const transcriptionUrl = process.env.THEMIS_URL;

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


