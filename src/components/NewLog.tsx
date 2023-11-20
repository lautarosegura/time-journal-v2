'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogs } from '@/context/LogsContext'
import { ToastAction } from '@radix-ui/react-toast'
import { FaPlus } from 'react-icons/fa6'
import { DatePicker } from './DatePicker'
import { useToast } from './ui/use-toast'

const NewLog = () => {
    const { toast } = useToast()

    const { log, setLog } = useLogs()

    const closeDialog = () => {
        document.getElementById('dialog-close-button')?.click()
    }

    const validateLog = () => {
        if (!log.date) {
            throw 'Date is required.'
        }

        if (!log.hours) {
            throw 'Hours are required.'
        }

        if (log.hours < 0) {
            throw 'Hours must be positive.'
        }

        if (log.hours === 0) {
            throw 'Hours must be greater than 0.'
        }

        if (log.hours > 12) {
            throw 'Hours must be less than 12.'
        }

        if (!log.note) {
            throw 'Note is required.'
        }
    }

    const handleLogSubmission = () => {
        try {
            validateLog()
            closeDialog()
        } catch (error) {
            toast({
                title: 'Oops! Something went wrong.',
                description: error as string,
                variant: 'destructive',
                action: <ToastAction altText='Try again'>Try again</ToastAction>
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                    className='ml-auto w-full sm:w-36 flex justify-center items-center gap-2 border-dashed border-gray-300 hover:border-solid'
                >
                    <FaPlus className='h-6 w-6' />
                    New Log
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create New Log</DialogTitle>
                    <DialogDescription>
                        Time is your most valuable asset - track it wisely.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='date' className='text-right'>
                            Date
                        </Label>
                        <DatePicker />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='hours' className='text-right'>
                            Hours
                        </Label>
                        <Input
                            id='hours'
                            type='number'
                            className='col-span-3'
                            onChange={(e) =>
                                setLog({
                                    ...log,
                                    hours: parseInt(e.target.value)
                                })
                            }
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='note' className='text-right'>
                            Note
                        </Label>
                        <Input
                            id='note'
                            type='text'
                            className='col-span-3'
                            placeholder='What did you do?'
                            onChange={(e) =>
                                setLog({ ...log, note: e.target.value })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type='submit' onClick={handleLogSubmission}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewLog
