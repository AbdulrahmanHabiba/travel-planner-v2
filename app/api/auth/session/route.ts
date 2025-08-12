import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No session found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: session.user
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 