// import { NextResponse } from 'next/server';
// export async function GET() {
//     const transcriptionUrl = process.env.THEMIS_URL;

//     try {
//         const response = await fetch(`${transcriptionUrl}/api/case_laws/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             return NextResponse.json({ error: errorData.detail || 'Failed to fetch cases' }, { status: response.status });
//         }

//         const cases = await response.json();
//         return NextResponse.json(cases, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching cases:', error);
//         return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
export async function GET() {
    const transcriptionUrl = process.env.THEMIS_URL;
    console.log('Transcription_URL :', transcriptionUrl);
    
    try {
        const response = await fetch(`${transcriptionUrl}/api/case_laws/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.detail || 'Failed to fetch cases' }, { status: response.status });
        }

        const cases = await response.json();
        return NextResponse.json(cases, { status: 200 });
    } catch (error) {
        console.error('Error fetching cases:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}