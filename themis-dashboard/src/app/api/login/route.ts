import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;

  // Validate environment variable
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }

  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      console.error('Validation failed: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Make the request to the backend API
    const response = await fetch(`${baseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Log the full response for debugging
    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    // Handle errors from the backend API
    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        return NextResponse.json(
          { error: errorData.detail || 'Invalid credentials' },
          { status: response.status }
        );
      } catch (e) {
        // If response is not valid JSON
        return NextResponse.json(
          { error: 'Unexpected response format from backend' },
          { status: response.status }
        );
      }
    }

    // Parse the response and send it back to the client
    const result = JSON.parse(textResponse);
    console.log('User logged in successfully:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
