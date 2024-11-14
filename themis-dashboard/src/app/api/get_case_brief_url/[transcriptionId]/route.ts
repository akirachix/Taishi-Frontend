import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.THEMIS_URL;

export async function GET(request: NextRequest, { params }: { params: { transcriptionId: number } }) {
    const { transcriptionId } = params;

 
    console.log("Received transcriptionId:", transcriptionId);

    if (!transcriptionId) {
        return NextResponse.json({ error: 'Invalid transcription ID' }, { status: 400 });
    }

    try {

        const response = await fetch(`${baseUrl}/api/download_case_brief/transcription/${transcriptionId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to retrieve PDF URL' }, { status: response.status });
        }

     
        const data = await response.json();

    
        return NextResponse.json({ pdf_url: data.pdf_url });
    } catch (error) {
        console.error("Error fetching case brief URL:", error);
        return NextResponse.json({ error: 'An unexpected error occurred while fetching the case brief URL.' }, { status: 500 });
    }
}
