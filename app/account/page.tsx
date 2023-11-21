import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types_db'
import AccountForm from '../../components/AccountForm'
import { redirect } from 'next/navigation';

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/');
   }

  return <AccountForm session={session} />
}