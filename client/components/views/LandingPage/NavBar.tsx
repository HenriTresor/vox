'use client'
import React, { useContext } from 'react'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'
import Logo from '@/components/reusables/logo'
import { Menu, LogOutIcon, PersonStandingIcon, PlusCircleIcon } from 'lucide-react'
import MenuBar from './Menu'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu as SmallMenu } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'


type Props = {}

export const navItems = [
    { name: 'Home', href: '#' },
    { name: 'about us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'How it Works', href: '#' },
]

function NavBar({ }: Props) {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const session = useSession()


    return (
        <div className='w-full h-auto p-3 flex justify-between items-center sticky top-0 z-10 bg-white'>

            <div className='flex w-1/2 justify-evenly items-center'>
                <Link href={'/'}>
                    <Logo />
                </Link>
                <nav className='items-center w-full justify-evenly hidden md:flex'>
                    {
                        navItems.map(item => (
                            <NavItem {...item} key={item.href} />
                        ))
                    }
                </nav>
            </div>
            {isMenuOpen && <MenuBar setIsMenuOpen={setIsMenuOpen} />}

            <Button variant={'ghost'} className='md:hidden block ' onClick={() => setIsMenuOpen(true)}>
                <Menu />
            </Button>
            {
                session.status === 'unauthenticated' ? (
                    <div className='p-2 hidden gap-4 sm:flex'>
                        <Button variant='outline' onClick={() => router.push('/login')}>
                            login
                        </Button>
                        <Button variant='default' onClick={() => router.push('/signup')}>
                            join us
                        </Button>
                    </div>
                ) :

                    (
                        <SmallMenu className='relative' as={'div'}>
                            <SmallMenu.Button className={'border-2 p-2 rounded-md '} >
                                profile
                            </SmallMenu.Button>
                            <SmallMenu.Items className={'absolute right-5 top-10 w-[40dvh] bg-white shadow-md border rounded-md p-1 flex flex-col'}>
                                <SmallMenu className="p-2 text-center text-[1.5rem] font-bold capitalize tracking-wider" as={'div'}>
                                    {session.data?.user?.firstName} {session.data?.user?.lastName}
                                </SmallMenu>
                                <SmallMenu.Item >
                                    {({ active }) => (
                                        <Link
                                            className={`p-2 text-left capitalize ${active && 'bg-neutral-200'} flex items-center gap-3`}
                                            href={'/choose-workspace'}>
                                            <PersonStandingIcon />
                                            my workspaces
                                        </Link>
                                    )}
                                </SmallMenu.Item>
                                <SmallMenu.Item >
                                    {({ active }) => (
                                        <Link
                                            className={`p-2 text-left capitalize ${active && 'bg-neutral-200'} flex items-center gap-3`}
                                            href={'/create-workspace'}>
                                            <PlusCircleIcon />
                                            create new workspace
                                        </Link>
                                    )}
                                </SmallMenu.Item>
                                <SmallMenu.Item >
                                    {({ active }) => (
                                        <Link href={'#'}
                                            className={`p-2 text-left capitalize ${active && 'bg-red-500'} flex items-center gap-3`}
                                            onClick={() => {
                                                signOut()
                                                location.assign('/login')
                                            }}
                                        >
                                            <LogOutIcon />
                                            Logout
                                        </Link>
                                    )}
                                </SmallMenu.Item>
                            </SmallMenu.Items>
                        </SmallMenu>

                    )
            }

        </div>
    )
}

export default NavBar