import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import AuthComponent from './components/AuthComponent'

const page = async () => {
    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.auth.getSession()

    if (data.session) {
        return redirect('/')
    }

    return <AuthComponent />
}

export default page
