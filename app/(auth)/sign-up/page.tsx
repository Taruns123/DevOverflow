'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/user.action';


const SignUp = () => {


    const router = useRouter();
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: "",
        picture: "https://i.ibb.co/p2W47qv/Screenshot-2024-07-31-230307.png",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await createUser(user);
            console.log("Signup response", response);
            router.push('/sign-in')
        } catch (error: any) {
            console.log("Signup failed", error.message);
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='size-full flex-col items-center justify-center'>
            <div className='m-auto mt-[200px] flex h-full w-[500px] flex-col text-black'>

                <h1 className='text-center text-2xl text-white'>
                    {loading ? 'Processing...' : 'Signup'}
                </h1>
                <hr />
                <label htmlFor="username">username</label>
                <input placeholder='username' type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value, name: e.target.value })} />
                <label htmlFor="email">email</label>
                <input placeholder='email' type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label htmlFor="password" >password</label>
                <input placeholder='password' type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button disabled={buttonDisabled} onClick={onSignUp} className='mt-2 rounded-md bg-blue-500 p-2 text-white'>
                    Signup
                </button>
                <Link href='/login'>
                    <p className='mt-2 text-center text-blue-500'>Login</p>
                </Link>
            </div>
        </div>
    )
}

export default SignUp