import {  NextResponse } from 'next/server';

export async function GET() {
    const diarizationUrl = process.env.THEMIS_URL;  // Ensure you have the BASE_URL in your environment variables

    try {
        // Make a GET request to the Django backend API to fetch diarized segments
        const response = await fetch(`${diarizationUrl}/api/diarized-segments/`, {
            method: 'GET',
        });

        // Check if the response is not successful
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.detail || 'Failed to fetch diarized segments' }, { status: response.status });
        }


    const transcriptions = await response.json();
    return NextResponse.json(transcriptions, { status: 200 });
} catch (error) {
    console.error('Error fetching transcriptions:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
}
}