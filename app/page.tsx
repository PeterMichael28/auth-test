import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types_db';
import AuthForm from '@/components/AuthForm';
import { redirect } from 'next/navigation';

export default async function Home() {
 const supabase = createServerComponentClient<Database>({ cookies });

 const {
  data: { session },
 } = await supabase.auth.getSession();

 if (session) {
  redirect('/account');
 }
 return (
  <main className="max-w-lg mx-auto pt-20 ">
   <div className="w-full shadow-lg p-6">
    <AuthForm session={session}/>
   </div>
  </main>
 );
}
