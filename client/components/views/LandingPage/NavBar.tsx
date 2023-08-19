import React from 'react'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'
import Logo from '@/components/reusables/logo'

type Props = {}

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Join', href: '#' },
    { name: 'How it Works', href: '#' },
]

function NavBar({ }: Props) {
    return (
        <div className='w-full h-auto p-3 flex justify-between items-center sticky top-0 z-10 bg-white'>
            <div className='flex w-1/2 justify-evenly items-center'>
                <Logo />
                <nav className='items-center w-full justify-evenly hidden sm:flex'>
                    {
                        navItems.map(item => (
                            <NavItem {...item} key={item.href} />
                        ))
                    }
                </nav>
            </div>

            <div className='p-2 flex gap-4'>
                <Button variant='outline'>
                    login
                </Button>
                <Button variant='default'>
                    sign up
                </Button>
            </div>
        </div>
    )
}

export default NavBar