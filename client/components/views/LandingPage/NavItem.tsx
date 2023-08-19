import Link from 'next/link';
import React from 'react'

type Props = {
    name: string;
    href: string;
}

function NavItem({name, href }: Props) {
    return (
        <Link
            className=''
            href={href}>
            {name}
       </Link>
    )
}

export default NavItem