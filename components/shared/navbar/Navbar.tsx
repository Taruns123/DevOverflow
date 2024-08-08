import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import MobileNav from './MobileNav'
import GlobalSearch from '../search/GlobalSearch'
import UserButton from '../UserButton'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'


const Navbar = () => {

    const cookieStore = cookies();
    const token = cookieStore.get('token');
    console.log("token", token);
    if (!token) redirect('/sign-in');
    const user: any = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
    const picture: string = user?.picture


    return (
        <nav className='flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12'>
            <Link href='/' className="flex items-center gap-1">
                <Image
                    src="/assets/images/site-logo.svg"
                    width={23}
                    height={23}
                    alt='DevFlow'
                />
                <p className='h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden'>Dev <span className='text-primary-500'>
                    Overflow   </span></p>
            </Link>

            <GlobalSearch />
            <div className='flex-between gap-5'>
                <Theme />
                <UserButton picture={picture} />


                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar