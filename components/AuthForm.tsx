'use client'
import { Auth } from '@supabase/auth-ui-react'
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  
  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/account');
      
    }
  }, [session, router]);

  return (
    <Auth
      supabaseClient={supabaseClient}
   
      magicLink={true}
          appearance={ {
              theme: ThemeSupa,
              variables: {
                  default: {
                      colors: {
                          brand: '#404040',
                      brandAccent: '#22c55e',
                          
                      }
                  }
              }
          } }
      theme="dark"
      
      providers={[]}
      
      
    />
  )
}