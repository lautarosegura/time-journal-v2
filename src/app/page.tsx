import Calendar from '@/components/Calendar'
import Logs from '@/components/Logs'
import NewLog from '@/components/NewLog'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.auth.getSession()

    if (!data.session) {
        return redirect('/auth')
    }

    return (
        <section>
            <div className='flex justify-center items-center mb-6'>
                <Calendar />
                <NewLog />
            </div>
            <Logs />
        </section>
    )
}
