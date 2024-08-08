import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.action'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken'



export default async function Collection() {

    const cookieStore = cookies();
    const token = cookieStore.get('token');
    console.log("token", token);
    if (!token) redirect('/sign-in');

    const user: any = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
    const email = user?.email;

    if (!email) redirect('/sign-in');

    const result = await getSavedQuestions({
        email
    });






    return (
        <>
            <h1 className='h1-bold text-dark100_light900'>Saved Questions</h1>

            <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
                <LocalSearchbar
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for questions"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:min-w[170px]"
                />
            </div>


            <div className='mt-10 flex w-full flex-col gap-6'>
                {
                    (result?.questions.length > 0) ?
                        result?.questions.map((question: any) => (
                            <QuestionCard key={question._id}
                                _id={question._id}
                                title={question.title}
                                tags={question.tags}
                                author={question.author}
                                upvotes={question.upvotes.length}
                                views={question.views}
                                answers={question.answers}
                                createdAt={question.createdAt}
                            />
                        ))
                        : <NoResult
                            title="There&apos;s no saved questions yet"
                            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                            link="/ask-question"
                            linkTitle="Ask a question"
                        />
                }

            </div>

        </>
    )
}
