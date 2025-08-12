import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: "يرجى تسجيل الدخول لعرض رحلاتك" },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { success: false, error: "خطأ في معلومات المستخدم" },
        { status: 401 }
      );
    }

    // Get all trips for this user
    const trips = await prisma.trip.findMany({
      where: { userId: session.user.id },
      orderBy: { startDate: 'desc' },
      include: {
        location: true
      }
    });

    return NextResponse.json({
      success: true,
      trips: trips
    });
  } catch (err) {
    console.error("Error in /api/trips:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء تحميل الرحلات" },
      { status: 500 }
    );
  }
};

export { GET }; 