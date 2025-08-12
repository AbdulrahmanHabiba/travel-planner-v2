interface GeocodeResult {
    country: string;
    formattedAddress: string;
  }
  
  export async function getCountryFromCoordinates(
    lat: number,
    lng: number
  ): Promise<GeocodeResult> {
    const apiKey = process.env.GEOAPIFY_API_KEY!;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
    );
  
    const data = await response.json();
  
    if (!data.features || data.features.length === 0) {
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }
  
    const properties = data.features[0].properties;
  
    return {
      country: properties.country || "Unknown",
      formattedAddress: properties.formatted || "Unknown address",
    };
  }
  