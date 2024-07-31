'use client'
import Question from '@/components/forms/Question'
import axios from 'axios';
import React from 'react'

const Page = () => {

    // const { userId } = auth();
    // const userId = await getUserByToken({token: ''});

    // const userId = "sdfdsfds"

    const [mongoUser, setMongoUser] = React.useState<any>(null);
    const [mongoUserId, setMongoUserId] = React.useState<any>(null);

    const getUserByToken = async () => {

        try {
            const user = await axios.get('/api/get-user-from-token');
            setMongoUser(user.data.data);
            console.log("user from token....", user);
            return user;
        } catch (error) {

            console.error(error);
        }
    }


    React.useEffect(() => {

        getUserByToken();
    }, [])


    React.useEffect(() => {
        console.log("object mongouser set", mongoUser);
        setMongoUserId(mongoUser?._id);
    }, [mongoUser])


    // if (!userId) redirect('/sign-in');




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