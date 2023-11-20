import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

const Calendar = () => {
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

    return (
        <section className='flex space-between gap-2 flex-wrap max-w-6xl'>
            {...getDaysInMonth().map((date, index) => {
                // Generate a random number between 0 and 10
                const hours = Math.floor(Math.random() * 10)

                return (
                    <HoverCard key={index}>
                        <HoverCardTrigger>
                            <div
                                className={cn(
                                    'h-6 w-6 bg-gray-200 rounded-sm hover:cursor-pointer',
                                    getColor(hours)
                                )}
                            ></div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {hours} hours on {date}
                        </HoverCardContent>
                    </HoverCard>
                )
            })}
        </section>
    )
}

export default Calendar
