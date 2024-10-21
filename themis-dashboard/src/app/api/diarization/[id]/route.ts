
import { NextResponse } from 'next/server';

const baseUrl = process.env.THEMIS_URL; 

export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const response = await fetch(`${baseUrl}/api/diarization/${id}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch diarization data' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred while fetching diarization data.' }, { status: 500 });
    }
}
