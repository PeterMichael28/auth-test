'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ session }: { session: Session }) {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/account');
      
    }
  }, [session, router]);

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
      redirectTo="https://auth-test-phi.vercel.app/api/auth/callback"
      
    />
  )
}