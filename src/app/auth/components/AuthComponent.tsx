'use client'

import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FaGithub } from 'react-icons/fa'

const AuthComponent = () => {
    const supabase = createClientComponentClient()

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })
    }

    return (
        <div className='p-5'>
            <div className='flex justify-center items-center h-50vh'>
                <div className='text-center space-y-5'>
                    <p className='text-gray-700'>
                        <span className='font-medium text-black'>
                            Time is your most valuable asset
                        </span>{' '}
                        - invest it wisely with our Time Journal app!
                    </p>
                    <Button
                        onClick={handleLogin}
                        className='items-center justify-center gap-2'
                    >
                        Login with GitHub <FaGithub className='h-6 w-6' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthComponent
