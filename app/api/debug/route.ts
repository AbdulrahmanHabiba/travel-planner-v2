import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({
        authenticated: false,
        message: "No session found"
      });
    }

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
      include: {
        trip: {
          include: {
            location: true
          }
        }
      }
    });

    // Get all trips count
    const tripsCount = await prisma.trip.count({
      where: { userId: session.user?.id }
    });

    // Get all locations count
    const locationsCount = await prisma.location.count({
      where: {
        trip: {
          userId: session.user?.id
        }
      }
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user?.id,
        email: session.user?.email,
        name: session.user?.name
      },
      database: {
        userExists: !!user,
        tripsCount,
        locationsCount,
        trips: user?.trip || []
      }
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
