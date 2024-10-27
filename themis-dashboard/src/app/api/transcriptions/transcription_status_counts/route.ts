import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const transcriptionUrl = process.env.THEMIS_URL;

    try {
        const response = await fetch(`${transcriptionUrl}/api/transcriptions/transcription_status_counts/`, {
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

