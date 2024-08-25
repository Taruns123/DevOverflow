import { getUserInfo } from '@/lib/actions/user.action';
import { URLProps } from '@/types'
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from '@/lib/utils';
import ProfileLink from '@/components/shared/ProfileLink';
import Stats from '@/components/shared/Stats';
import QuestionTab from '@/components/shared/QuestionTab';
import AnswersTab from '@/components/shared/AnswersTab';


const Page = async ({ params, searchParams }: URLProps) => {

    const cookieStore = cookies();
    const token = cookieStore.get('token');
    console.log("token", token);

    let user: any = null;
    if (token) {

        try {
            user = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    const currentUserId = user.id;

    const userInfo = await getUserInfo({ id: params.id });

    return (
        <>
            <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
                <div className="flex flex-col items-start gap-4 lg:flex-row">
                    <Image
                        src={userInfo?.user.picture}
                        alt='profile picture'
                        width={100}
                        height={100}
                        className='rounded-full object-cover'
                    />
                    <div className="mt-3 ">
                        <h2 className='h2-bold text-dark100_light900'>{userInfo?.user.name}</h2>
                        <p className='paragraph-regular text-dark200_light800'>@{userInfo?.user.username}</p>
                        <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                            {userInfo?.user.portfolioWebsite && (
                                <ProfileLink
                                    imgUrl="/assets/icons/link.svg"
                                    href={userInfo?.user.portfolioWebsite}
                                    title="Portfolio"
                                />
                            )}
                            {userInfo?.user.location && (
                                <ProfileLink
                                    imgUrl="/assets/icons/location.svg"
                                    title={userInfo.user.location}
                                />
                            )}

                            <ProfileLink
                                imgUrl="/assets/icons/calendar.svg"
                                title={'Joined ' + getJoinedDate(userInfo?.user.joinedAt)}
                            />


                        </div>

                        {userInfo?.user.bio && (
                            <p className='paragraph-regular text-dark400_light800 mt-8'>{userInfo?.user.bio}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                    {/* // TODO show only if signedIn */}
                    {

                        currentUserId === params.id && (

                            <Link href={'/profile/edit'}>
                                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>
                                    Edit Profile
                                </Button>
                            </Link>
                        )

                    }
                </div>
            </div>

            <Stats
                totalQuestions={userInfo?.totalQuestions!}
                totalAnswers={userInfo?.totalAnswers!}

            />
            <div className="mt-10 flex gap-10">
                <Tabs defaultValue="top-posts" className="w-4/5">
                    <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
                        <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
                        <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="top-posts" className='flex w-full flex-col gap-6'>
                        <QuestionTab searchParams={searchParams} userId={userInfo?.user._id} email={userInfo?.user.email} />
                    </TabsContent>
                    <TabsContent value="answers" className='flex w-full flex-col gap-6'>
                        <AnswersTab searchParams={searchParams} userId={userInfo?.user._id} email={userInfo?.user.email} />
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export default Page