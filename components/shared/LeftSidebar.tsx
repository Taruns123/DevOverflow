'use client'

import { sidebarLinks } from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import React from 'react'
import { Button } from "../ui/button";

const LeftSidebar = () => {

    const pathname = usePathname();
    return (
        <section className='background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
            <div className='flex h-full flex-col gap-6 '>
                {sidebarLinks.map((item) => {
                    const isActive = (pathname.includes(item.route) && item.route.length > 1) || (pathname === item.route)
                    return (
                        <Link key={item.route} href={item.route}
                            className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
                        >
                            <Image className={`${isActive ? "" : "invert-colors"}`} src={item.imgURL} alt={item.label} width={20} height={20} />
                            <p className={`max-lg:hidden ${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
                        </Link>
                    )
                })}


                {/* Todo only show if signedout */}
                <div className='mb-36 flex flex-col gap-3'>
                    <div >
                        <Link href='/sign-in'>
                            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                                <Image
                                    src="/assets/icons/account.svg"
                                    alt="login" width={20} height={20}
                                    className="invert-colors lg:hidden"
                                />
                                <span className='primary-text-gradient max-lg:hidden'>Login</span>
                            </Button>
                        </Link>
                    </div>
                    <div >
                        <Link href='/sign-in'>
                            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                                <Image
                                    src="/assets/icons/sign-up.svg"
                                    alt="sign-up" width={20} height={20}
                                    className="invert-colors lg:hidden"
                                />
                                <span className=' max-lg:hidden'>Sign Up</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default LeftSidebar