import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types_db';
import AuthForm from '@/components/AuthForm';
import { redirect } from 'next/navigation';

export default async function Home() {


 return (
     <main className="max-w-lg mx-auto pt-20 ">
   <div className="w-full shadow-lg p-6">
         <h1 className='text-white/70 text-2xl md:text-4xl text-center mb-8 font-bold'>User Authentication</h1>
    <AuthForm />
   </div>
  </main>
 );
}
