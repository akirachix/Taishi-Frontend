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

        // Parse the response and return the list of diarized segments
        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error fetching diarized segments:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
