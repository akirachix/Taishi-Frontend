import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.THEMIS_URL;

export async function GET(request: NextRequest, { params }: { params: { transcriptionId: number } }) {
    const { transcriptionId } = params;

    // Log the transcriptionId to verify it’s received correctly
    console.log("Received transcriptionId:", transcriptionId);

    if (!transcriptionId) {
        return NextResponse.json({ error: 'Invalid transcription ID' }, { status: 400 });
    }

    try {
        // Fetch the PDF URL from the Django backend
        const response = await fetch(`${baseUrl}/api/download_case_brief/transcription/${transcriptionId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to retrieve PDF URL' }, { status: response.status });
        }

        // Parse the JSON response from the backend to get the pdf_url
        const data = await response.json();

        // Return the fetched URL from the backend to the client
        return NextResponse.json({ pdf_url: data.pdf_url });
    } catch (error) {
        console.error("Error fetching case brief URL:", error);
        return NextResponse.json({ error: 'An unexpected error occurred while fetching the case brief URL.' }, { status: 500 });
    }
}
