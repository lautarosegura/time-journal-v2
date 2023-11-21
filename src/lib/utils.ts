import { useLogs } from '@/context/LogsContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { clsx, type ClassValue } from 'clsx'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getUser = async () => {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) return null

    return data.user
}

export const fetchLogs = async () => {
    const supabase = createClientComponentClient()

    const user = await getUser()

    if (!user) {
        await supabase.auth.signOut()
        return redirect('/auth')
    }

    const { data: logsData, error: logsError } = await supabase
        .from('logs')
        .select('*')
        .eq('user_id', user.id)

    if (logsError) {
        throw logsError
    }

    if (!logsData) {
        return
    }

    return logsData[0]?.logs || []
}
