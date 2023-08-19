import React from 'react'
import NavItem from './NavItem'

type Props = {}

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Join', href: '#' },
    { name: 'How it Works', href: '#' },
]

function NavBar({ }: Props) {
    return (
        <div className='w-full h-auto p-3 flex justify-between items-center'>
            <div>
                <h1>LOGO</h1>
                <nav>
                    {
                        navItems.map(item => (
                            <NavItem {...item} key={item.href} />
                        ))
                    }
                </nav>
            </div>

            <div>
                <button></button>
            </div>
        </div>
    )
}

export default NavBar