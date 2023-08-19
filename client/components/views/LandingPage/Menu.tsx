import Logo from '@/components/reusables/logo'
import React from 'react'
import { navItems } from './NavBar'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'

type Props = {
    setIsMenuOpen: (val: boolean) => void
}

function MenuBar({ setIsMenuOpen }: Props) {
    return (
        <div className='w-full fixed h-full top-0 left-0 flex justify-end items-start bg-[#0000004d] md:hidden'>
            <div className='h-full p-4 w-3/6 bg-white text-black flex flex-col justify-start gap-5'
            >
                <Button onClick={() => setIsMenuOpen(false)}>close</Button>
                <Logo />
                <div className='flex flex-col gap-4 w-full h-auto'>
                    {
                        navItems.map(item => (
                            <div key={item.href} className='p-4 mt-5  '>
                                <NavItem {...item} />
                            </div>
                        ))
                    }
                </div>
                <div className='p-2 flex gap-4 sm:hidden'>
                    <Button variant='outline'>
                        login
                    </Button>
                    <Button variant='default'>
                        join us
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MenuBar