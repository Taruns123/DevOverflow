'use server'
import Question from '@/components/forms/Question'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {


    const cookieStore = cookies();
    const token = cookieStore.get('token');
    console.log("token", token);
    if (!token) redirect('/sign-in');

    const user: any = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
    const mongoUserId = user?.id;

    return (
        <div className='h1-bold text-dark100_light900'>
            <h1>Ask a question</h1>
            <div className='mt-9'>

                <Question mongoUserId={mongoUserId} />
            </div>
        </div>
    )
}

export default Page