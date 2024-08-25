import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Navbar from '@/components/shared/navbar/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    console.log("token", token);
    if (!token) redirect('/sign-in');

    const user: any = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
    const userId = user?.id;

    return (
        <main className='background-light850_dark100 relative'>
            <Navbar />
            <div className="flex">
                <LeftSidebar userId={userId} />
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>

                    <div className='mx-auto w-full max-w-5xl'>
                        {children}
                    </div>
                </section>
                <RightSidebar />
            </div>
            {/* Toaster */}
        </main>
    )
}

export default Layout