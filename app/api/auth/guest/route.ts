import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST() {
  const guestUser = await prisma.user.findUnique({
    where: { email: "guest@travelplanner.com" },
  });

  if (!guestUser) {
    return NextResponse.json({ error: "Guest user not found" }, { status: 500 });
  }

  const sessionToken = randomUUID();

  await prisma.session.create({
    data: {
      sessionToken,
      userId: guestUser.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    },
  });

  const cookiesStore = await cookies();
  cookiesStore.set("next-auth.session-token", sessionToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
