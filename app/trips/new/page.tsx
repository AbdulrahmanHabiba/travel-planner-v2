
"use client"
import { Button } from '@/components/ui/button';
import { Card ,CardHeader ,CardContent } from '@/components/ui/card'
import React, { useState, useTransition } from 'react'
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from '@/lib/utils';
import { UploadButton } from '@/lib/uploadthing';
import Image  from 'next/image';
import { Datepicker, Textarea, TextInput } from 'flowbite-react';

export default function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl ,setImageUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false);
    const [startDate ,setStartDate] = useState<Date>(new Date())


  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader> New Trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransition(() => {
                if (imageUrl) {
                    formData.append("imageUrl", imageUrl);
                  }                
                  createTrip(formData);

              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-main mb-1">
                Title
              </label>
              <TextInput name='title' placeholder='Japan trip...' id="title" type="text" required 
                style={{background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)"}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-main mb-1">
                Description
              </label>
              <Textarea name='description' id="description" placeholder="Trip description..." required rows={4}
                style={{background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)"}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-main mb-1">
                  Start Date
                </label>
                <Datepicker minDate={new Date()} name="startDate" onChange={(val)=>setStartDate(val!)} />  
              </div>
              <div>
                <label className="block text-sm font-medium text-main mb-1">
                  End Date
                </label>
                <Datepicker name="endDate" minDate={startDate || undefined} />  
              </div>
            </div>
            <div>
              <div>
              <label> Trip Image</label>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-48 object-cover"
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onUploadBegin={()=> setIsUploading(true)}
                onUploadAborted={()=> setIsUploading(false)}
                onClientUploadComplete={(res) => {
                 setIsUploading(false) ;
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                 
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>
       
            </div>
            <Button type="submit" disabled={isPending || isUploading} className="w-full button">
              {isPending || isUploading ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
