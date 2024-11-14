
// import { NextResponse } from 'next/server';

// const baseUrl = process.env.THEMIS_URL; 

// export async function GET(request: Request, { params }: { params: { id: number } }) {
//     try {
//         const { id } = params;
//         const response = await fetch(`${baseUrl}/api/case_brief/${id}`);

//         if (!response.ok) {
//             return NextResponse.json({ error: 'Failed to fetch case_brief data' }, { status: response.status });
//         }

//         const result = await response.json();
//         return NextResponse.json(result, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: 'An unexpected error occurred while fetching case_brief data.' }, { status: 500 });
//     }
// }





// export async function POST( { params }: { params: { id: number } }) {
//     const { id } = params;
  
//     try {
//       console.log(`Sending request to backend for transcription ID: ${id}`);
  
//       const response = await fetch(`${baseUrl}/case_brief/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           transcription: id,
//         }),
//       });
  
//       if (!response.ok) {
//         console.error("Backend response failed:", await response.text());
//         return NextResponse.json(
//           { error: "Failed to generate case brief" },
//           { status: response.status }
//         );
//       }
  
//       const result = await response.json();
//       console.log("Backend response data:", result);
//       return NextResponse.json(result, { status: 201 });
  
//     } catch (error) {
//       console.error("Unexpected error while communicating with backend:", error);
//       return NextResponse.json(
//         { error: "An unexpected error occurred while generating the case brief." },
//         { status: 500 }
//       );
//     }
//   }




import { NextResponse } from 'next/server';

const baseUrl = process.env.THEMIS_URL; 

export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const response = await fetch(`${baseUrl}/api/case_briefs/${id}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch case_brief data' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred while fetching case_brief data.' }, { status: 500 });
    }
};


// 'POST' method

export async function POST(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;

        const response = await fetch(`${baseUrl}/api/case_briefs/`, {
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
                { error: 'Failed to generate case brief' }, 
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred while generating case brief.' }, 
            { status: 500 }
        );
    }
}