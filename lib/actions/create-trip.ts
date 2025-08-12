"use server"

import { auth } from "@/auth";
import { formatDate } from "../format-date";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';
import { Trip } from "@/app/generated/prisma";

export async function createTrip(formData: FormData) {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Not authenticated.");
    }

    const title = formData.get("title")?.toString() ;
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();

    const startDate = formatDate(formData.get("startDate")!);
    const endDate = formatDate(formData.get("endDate")!) ;

    if (!title || !description || !startDate || !endDate) {
        throw new Error("All fields are required.");
      }

      await prisma.trip.create({
        data: {
          title,
          description,
          imageUrl ,
          startDate,
          endDate,
          userId: session.user.id,
        },
      });
      
      redirect("/trips");
}


