// // src/app/api/join-meeting/join-meeting.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { meetingLink } = req.body;

//     // Validate meeting link before processing
//     if (!meetingLink) {
//       return res.status(400).json({ error: 'Meeting link is required' });
//     }

//     try {
//       // Trigger backend server (Express) to handle the meeting automation
//       const response = await fetch('http://localhost:3002/api/join-meeting', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ meetingLink }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error from backend:', errorData);
//         return res.status(response.status).json({ error: errorData.error || 'Failed to join meeting' });
//       }

//       const data = await response.json();
//       console.log('Meeting join initiated successfully:', data);
//       return res.status(200).json({ message: data.message || 'Meeting join initiated successfully' });
//     } catch (error) {
//       console.error('Error joining meeting:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }



// src/app/api/join-meeting/route.ts
import { NextResponse } from 'next/server';

// Define your POST handler directly
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const meetingLink = body.meetingLink;

    if (!meetingLink) {
      return NextResponse.json({ error: 'Meeting link is required' }, { status: 400 });
    }

    // Add your logic to handle the meeting link here...
    // You can trigger scripts, make API calls, etc.

    return NextResponse.json({ message: 'Meeting join initiated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

