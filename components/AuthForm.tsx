'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
   
      magicLink={true}
          appearance={ {
              theme: ThemeSupa,
              variables: {
                  default: {
                      colors: {
                          brand: '#404040',
                          brandAccent: '#22c55e'
                      }
                  }
              }
          } }
      theme="dark"
      
      providers={['github']}
      redirectTo="http://localhost:3000/api/auth/callback"
      
    />
  )
}