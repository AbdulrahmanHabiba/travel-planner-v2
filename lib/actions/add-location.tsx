"use server"
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from "next/navigation";

const geocodeAddress = async (address: string) => {
    const apiKey = process.env.GEOAPIFY_API_KEY
    
    if (!apiKey) {
      throw new Error("GEOAPIFY_API_KEY is not configured");
    }
    
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      throw new Error(`No results found for address: "${address}". Please try a more specific address.`);
    }
    
    const [lon, lat] = data.features[0].geometry.coordinates;
    
    return { lat, lng: lon };
}



export const addLocation = async (formtDate:FormData , tripId:string ) => {
    const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formtDate.get("address")?.toString()
  if (!address) {
    throw new Error("Address is required")
  }

  const {lat , lng} = await geocodeAddress(address)

  const count = await prisma.location.count({where : {tripId}})

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });   

  redirect(`/trips/${tripId}`)
}