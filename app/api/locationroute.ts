import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// Function to get country from coordinates using Geoapify
async function getCountryFromCoordinates(lat: number, lng: number) {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  
  if (!apiKey) {
    return { country: "Unknown", formattedAddress: "Unknown" };
  }
  
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const country = feature.properties.country || "Unknown";
      const formattedAddress = feature.properties.formatted || "Unknown";
      
      return { country, formattedAddress };
    }
  } catch (error) {
    console.error('Error getting country from coordinates:', error);
  }
  
  return { country: "Unknown", formattedAddress: "Unknown" };
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);

        return {
          name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geocodeResult.country,
        };
      })
    );

    return NextResponse.json({
      success: true,
      locations: transformedLocations
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 