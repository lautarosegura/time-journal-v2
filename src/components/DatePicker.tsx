'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { useLogs } from '@/context/LogsContext'
import { cn } from '@/lib/utils'
import { SelectSingleEventHandler } from 'react-day-picker'

export function DatePicker() {
    const { log, setLog } = useLogs()

    const setDate = (date: Date) =>
        setLog({
            ...log,
            date
        })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'justify-start text-left font-normal col-span-3',
                        !log.date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {log.date ? (
                        format(log.date, 'PPP')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    onSelect={setDate as SelectSingleEventHandler}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
