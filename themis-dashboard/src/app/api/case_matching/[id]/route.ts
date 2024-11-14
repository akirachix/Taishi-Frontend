
import { NextResponse } from 'next/server';

const baseUrl = process.env.THEMIS_URL; 
console.log('BASE_URL :', baseUrl);



export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const response = await fetch(`${baseUrl}/api/case_laws/${id}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch case_brief data' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred while fetching case_brief data.' }, { status: 500 });
    }
};




export async function POST(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;

        const response = await fetch(`${baseUrl}/api/case_laws/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transcription: id
            })
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to generate case laws' }, 
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred while generating case laws.' }, 
            { status: 500 }
        );
    }
}