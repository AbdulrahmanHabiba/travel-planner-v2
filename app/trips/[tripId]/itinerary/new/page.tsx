import NewLocationClient from '@/components/new-location';
import React from 'react' 
export default async function NewLocation({params} : {params :Promise<{tripId :string}>}) {
  const {tripId} = await params
  return <NewLocationClient tripId={tripId} />;

}
