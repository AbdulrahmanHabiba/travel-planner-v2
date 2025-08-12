import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCountryFromCoordinates } from "@/lib/actions/geocode"; 

const GET = async () => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session?.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat : true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations  = await Promise.all(
        locations.map(async (location)=> {
            const {lat ,lng ,trip} = location
            const geocodeResult = await getCountryFromCoordinates(lat ,lng) ;

            return {
                name: `${trip.title} - ${geocodeResult.formattedAddress}`, 
                lat ,
                lng ,
                country: geocodeResult.country, 
            }
        })
    )
    return NextResponse.json(transformedLocations)
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    )
  }
};

export { GET };
