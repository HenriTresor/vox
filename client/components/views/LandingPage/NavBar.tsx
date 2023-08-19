'use client'
import React from 'react'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'
import Logo from '@/components/reusables/logo'
import { Menu } from 'lucide-react'
import MenuBar from './Menu'

type Props = {}

export const navItems = [
    { name: 'Home', href: '#' },
    { name: 'about us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'How it Works', href: '#' },
]

function NavBar({ }: Props) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    return (
        <div className='w-full h-auto p-3 flex justify-between items-center sticky top-0 z-10 bg-white'>
            <div className='flex w-1/2 justify-evenly items-center'>
                <Logo />
                <nav className='items-center w-full justify-evenly hidden md:flex'>
                    {
                        navItems.map(item => (
                            <NavItem {...item} key={item.href} />
                        ))
                    }
                </nav>
            </div>
            {isMenuOpen && <MenuBar setIsMenuOpen={setIsMenuOpen} />}
            <Button variant={'ghost'} className='md:hidden block ' onClick={()=>setIsMenuOpen(true)}>
                <Menu />
            </Button>
            <div className='p-2 hidden gap-4 sm:flex'>
                <Button variant='outline'>
                    login
                </Button>
                <Button variant='default'>
                    join us
                </Button>
            </div>
        </div>
    )
}

export default NavBar