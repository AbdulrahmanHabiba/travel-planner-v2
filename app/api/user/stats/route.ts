import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: "يرجى تسجيل الدخول" },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { success: false, error: "خطأ في معلومات المستخدم" },
        { status: 401 }
      );
    }

    // Get total trips count
    const totalTrips = await prisma.trip.count({
      where: { userId: session.user.id }
    });

    // Get unique countries count
    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user.id
        }
      },
      select: {
        lat: true,
        lng: true
      }
    });

    // For now, we'll count unique coordinates as a proxy for countries
    // In a real app, you'd have country data stored
    const uniqueLocations = new Set(
      locations.map(loc => `${Math.round(loc.lat)},${Math.round(loc.lng)}`)
    );
    const totalCountries = uniqueLocations.size;

    // Get upcoming trips count
    const today = new Date();
    const upcomingTrips = await prisma.trip.count({
      where: {
        userId: session.user.id,
        startDate: {
          gte: today
        }
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalTrips,
        totalCountries,
        upcomingTrips
      }
    });
  } catch (err) {
    console.error("Error in /api/user/stats:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء تحميل الإحصائيات" },
      { status: 500 }
    );
  }
};

export { GET };


