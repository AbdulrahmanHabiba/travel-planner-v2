import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({
        error: "No session found",
        authenticated: false
      });
    }

    // Get all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });

    // Get all trips
    const allTrips = await prisma.trip.findMany({
      select: { id: true, title: true, userId: true }
    });

    // Get all locations
    const allLocations = await prisma.location.findMany({
      select: { id: true, locationTitle: true, tripId: true }
    });

    // Get current user's data
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user?.id },
      include: {
        trip: {
          include: {
            location: true
          }
        }
      }
    });

    return NextResponse.json({
      authenticated: true,
      currentUser: {
        id: session.user?.id,
        email: session.user?.email,
        name: session.user?.name
      },
      database: {
        totalUsers: allUsers.length,
        totalTrips: allTrips.length,
        totalLocations: allLocations.length,
        allUsers,
        allTrips,
        allLocations,
        currentUserData: currentUser
      }
    });
  } catch (error) {
    console.error("Test DB error:", error);
    return NextResponse.json({
      error: "Database error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

