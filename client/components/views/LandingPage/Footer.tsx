import { link } from 'fs'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import NavItem from './NavItem'

type Props = {}

const links = [
    {
        title: "company",
        links: [
            {
                name: 'about', href: '#'
            },
            {
                name: 'help', href: '#'
            },
            {
                name: 'contact us', href: '#'
            },
            {
                name: 'careers', href: '#'
            },
            {
                name: 'API', href: '#'
            },
        ]
    },
    {
        title: "company",
        links: [
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
        ]
    },
    {
        title: "company",
        links: [
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
            {
                name: 'about', href: '#'
            },
        ]
    },
]

const Footer = (props: Props) => {
    return (
        <div className='w-full p-4  bg-neutral-900 text-white h-auto flex flex-col justify-between gap-10 mt-10'>
       
            <div className=' text-center flex flex-col sm:flex-row items-center gap-28'>
                <div className='w-1/2 flex flex-col items-center gap-4'>
                    <p>Hey, want to tell us something?</p>
                    <div className='flex gap-4 ml-5'>
                        <a href="">
                            <FaFacebook />
                        </a>
                        <a href="">
                            <FaTwitter />
                        </a>
                        <a href="">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
                <div className='w-1/2 flex justify-evenly items-start gap-5'>
                    {
                        links.map(link => (
                            <div className='' key={link.title}>
                                <h1 className='uppercase font-bold mb-6'>{link.title}</h1>
                                <div className='w-full flex flex-col gap-5'>
                                    {link.links.map(subLink => (
                                        <NavItem {...subLink} key={subLink.href} />
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <p className='p-4 text-center align-center'>&copy; Vox, Inc. 2023. All rights reserved.</p>
        </div>
    )
}

export default Footer