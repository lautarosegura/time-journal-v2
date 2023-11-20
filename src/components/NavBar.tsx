'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { MdTimer } from 'react-icons/md'
import { Button } from './ui/button'

const NavBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClientComponentClient()
    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    const isAuthPage = pathname === '/auth'

    return (
        <nav className='flex justify-between p-5 border-b border-gray-300 mb-5'>
            <a href='/' className='flex items-center gap-1'>
                <MdTimer className='h-6 w-6' />
                <h1 className='font-bold'>Time Journal v2</h1>
            </a>

            {!isAuthPage ? (
                <Button onClick={handleLogout}>Sign Out</Button>
            ) : null}
        </nav>
    )
}

export default NavBar
