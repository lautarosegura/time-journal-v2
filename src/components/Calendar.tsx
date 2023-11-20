'use client'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card'
import { useLogs } from '@/context/LogsContext'
import { cn } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const Calendar = () => {
    const { logs, setLogs, setIsLoading } = useLogs()

    const getDaysInMonth = (year = dayjs().year(), month = dayjs().month()) => {
        const startDate = dayjs().year(year).month(month).date(1)
        const endDate = startDate.endOf('month')

        const dates = []

        for (let i = startDate.date(); i <= endDate.date(); i++) {
            dates.push(startDate.date(i).format('YYYY-MM-DD'))
        }

        return dates
    }

    const getColor = (hours: number) => {
        return hours === 0
            ? 'bg-gray-200'
            : hours < 5
            ? 'bg-green-100'
            : hours < 10
            ? 'bg-green-300'
            : 'bg-green-500'
    }

    useEffect(() => {
        const fetchLogs = async () => {
            const supabase = createClientComponentClient()

            const { data: userData, error } = await supabase.auth.getUser()

            if (error) {
                throw error
            }

            if (!userData || !userData.user) {
                await supabase.auth.signOut()
                return redirect('/auth')
            }

            const { data: logsData, error: logsError } = await supabase
                .from('logs')
                .select('*')
                .eq('user_id', userData.user.id)

            if (logsError) {
                throw logsError
            }

            if (!logsData) {
                return
            }

            setLogs(logsData[0]?.logs || [])
        }

        setIsLoading(true)
        fetchLogs().then(() => setIsLoading(false))
    }, [])

    return (
        <section className='flex space-between gap-2 flex-wrap max-w-6xl'>
            {...getDaysInMonth().map((date, index) => {
                const logEntries = logs.filter(
                    (log) => dayjs(log.date).format('YYYY-MM-DD') === date
                )

                const totalHours = logEntries.reduce(
                    (acc, log) => acc + log.hours,
                    0
                )

                return (
                    <HoverCard key={index}>
                        <HoverCardTrigger>
                            <div
                                className={cn(
                                    'h-6 w-6 bg-gray-200 rounded-sm hover:cursor-pointer',
                                    getColor(totalHours)
                                )}
                            ></div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {totalHours} hours on {date}
                        </HoverCardContent>
                    </HoverCard>
                )
            })}
        </section>
    )
}

export default Calendar
