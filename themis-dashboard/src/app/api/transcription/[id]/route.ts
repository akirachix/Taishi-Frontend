const transcriptionUrl = process.env.THEMIS_URL;
export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const response = await fetch(`${transcriptionUrl}/api/transcription/${params.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch transcription' }), { status: response.status });
        }

        const transcription = await response.json();
        return new Response(JSON.stringify(transcription), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
    }
}