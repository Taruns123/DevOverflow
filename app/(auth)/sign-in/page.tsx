'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignIn = () => {


    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try {

            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Login success", response);
            router.push("/");
        }
        catch (error: any) {
            console.log("Login failed", error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className='size-full flex-col items-center justify-center'>
            <div className='m-auto mt-[200px] flex h-full w-[500px] flex-col text-black'>

                <h1 className='text-center text-2xl text-white'>
                    {loading ? "Loading..." : "Login"}
                </h1>
                <hr />
                <label htmlFor="email">email</label>
                <input placeholder='email' type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label htmlFor="password" >password</label>
                <input placeholder='password' type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button disabled={buttonDisabled} onClick={onLogin} className='mt-2 rounded-md bg-blue-500 p-2 text-white'>
                    Login
                </button>
                <Link href='/sign-up'>
                    <p className='mt-2 text-center text-blue-500'>Signup</p>
                </Link>
            </div>
        </div>
    )
}

export default SignIn