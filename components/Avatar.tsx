'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/types_db'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import {  toast } from 'react-toastify';



type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}) {
  console.log(url)
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
      toast.error('Error downloading image')

        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      toast.error('Error uploading avatar!')
    console.log('Error uploading avatar:', error)
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {avatarUrl ? (
        <Image
          width={300}
          height={300}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full object-cover overflow-hidden h-[150px] w-[150px]"
          
        />
      ) : (
        <div className="bg-[#333] border border-[rgb(200,200,200)] rounded-full h-[150px] w-[150px]"  />
      )}
      <div style={{ width: size }}>
        <label className="button button-primary block w-full" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
       
          className='absolute hidden'
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}