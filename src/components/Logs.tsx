'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Log, useLogs } from '@/context/LogsContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import { BiGhost } from 'react-icons/bi'
import { CgSpinnerAlt } from 'react-icons/cg'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'

const Logs = () => {
    const { logs, isLoading, setLogs } = useLogs()

    const handleLogDeletion = async (id: string) => {
        try {
            const supabase = createClientComponentClient()

            const { data: userData, error: userError } =
                await supabase.auth.getUser()

            if (userError) throw userError.message

            if (!userData || !userData.user) {
                await supabase.auth.signOut()
                return redirect('/auth')
            }

            const { data: logsData, error: logsError } = await supabase
                .from('logs')
                .select('logs')
                .eq('user_id', userData.user.id)
                .single()

            if (logsError) throw logsError.message

            if (!logsData) throw 'No logs found.'

            const existingLogs = logsData.logs as Log[]

            const log = existingLogs.find((log) => log.id === id)
            const updatedLogs = existingLogs.filter((log) => log.id !== id)

            const { error: updateError } = await supabase
                .from('logs')
                .update({ logs: updatedLogs })
                .eq('user_id', userData.user.id)

            if (updateError) throw updateError.message

            setLogs(updatedLogs)

            toast('Log deleted succesfully.', {
                duration: 4000
            })
        } catch (error) {
            toast('Oops! Something went wrong.', {
                duration: 4000
            })
        }
    }

    return (
        <div>
            {!isLoading ? (
                logs.length ? (
                    <Table>
                        <TableCaption>A list of your time logs.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-1/4'>Date</TableHead>
                                <TableHead className='w-1/4'>Hours</TableHead>
                                <TableHead className='w-2/4'>Note</TableHead>
                                <TableHead className='w-1/4 text-right'>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {...logs
                                .sort((a, b) => {
                                    if (a.date! > b.date!) {
                                        return 1 // Swap the order to sort in ascending order
                                    }

                                    if (a.date! < b.date!) {
                                        return -1 // Swap the order to sort in ascending order
                                    }

                                    return 0
                                })
                                .map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className='font-medium'>
                                            {dayjs(log.date!).format(
                                                'YYYY-MM-DD'
                                            )}
                                        </TableCell>
                                        <TableCell>{log.hours}</TableCell>
                                        <TableCell>{log.note}</TableCell>
                                        <TableCell className='text-right items-center justify-center'>
                                            <FaRegTrashAlt
                                                onClick={() =>
                                                    handleLogDeletion(log.id)
                                                }
                                                className='h-4 w-4 cursor-pointer hover:scale-[1.15] transition-all text-red-500 hover:text-opacity-70'
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className='text-center flex flex-col items-center justify-center gap-2 max-w-xl mx-auto mt-15'>
                        <BiGhost className='h-8 w-8 block' />
                        <p className='font-semibold text-zinc-700'>
                            Pretty empty around here - let's create your first
                            log entry!
                        </p>
                    </div>
                )
            ) : (
                <CgSpinnerAlt className='mx-auto mt-10 h-10 w-10 animate-spin' />
            )}
        </div>
    )
}

export default Logs
