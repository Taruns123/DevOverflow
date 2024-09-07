import { getUserQuestions } from '@/lib/actions/user.action';
import React from 'react'
import QuestionCard from '../cards/QuestionCard';
import { SearchParamsProps } from '@/types';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
    userId: string;
    email?: string | null;
}

const QuestionTab = async ({ searchParams, userId, email }: Props) => {

    const result = await getUserQuestions({ userId, page: searchParams.page ? +searchParams.page : 1 });


    return (
        <>
            {result.questions.map((question, index) => (

                <QuestionCard key={question._id}
                    _id={question._id}
                    email={email}
                    title={question.title}
                    tags={question.tags}
                    author={question.author}
                    upvotes={question.upvotes.length}
                    views={question.views}
                    answers={question.answers}
                    createdAt={question.createdAt}
                />
            ))}
            <div className='mt-10'>
                <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result?.isNext ? result.isNext : false} />
            </div>
        </>
    )
}

export default QuestionTab