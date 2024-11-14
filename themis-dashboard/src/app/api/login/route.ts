import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;


  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      console.error('Validation failed: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${baseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        return NextResponse.json(
          { error: errorData.detail || 'Invalid credentials' },
          { status: response.status }
        );
      } catch (e) {

        return NextResponse.json(
          { error: 'Unexpected response format from backend' },
          { status: response.status }
        );
      }
    }

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
