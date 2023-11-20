import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { Button } from './ui/button'

const Logs = () => {
    return (
        <div>
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
                    <TableRow>
                        <TableCell className='font-medium'>INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className='text-right flex gap-3'>
                            <FaPencil className='h-4 w-4 cursor-pointer hover:scale-[1.15] transition-all hover:text-opacity-70' />
                            <FaRegTrashAlt className='h-4 w-4 cursor-pointer hover:scale-[1.15] transition-all text-red-500 hover:text-opacity-70' />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default Logs
