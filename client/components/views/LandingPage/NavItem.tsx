import Link from 'next/link';
import React from 'react'

type Props = {
    name: string;
    href: string;
}

function NavItem({name, href }: Props) {
    return (
        <Link
            className=' font-[500] capitalize hover:text-neutral-600 tracking-wider'
            href={href}>
            {name}
       </Link>
    )
}

export default NavItem