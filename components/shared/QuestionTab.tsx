import { getUserQuestions } from '@/lib/actions/user.action';
import React from 'react'
import QuestionCard from '../cards/QuestionCard';
import { SearchParamsProps } from '@/types';

interface Props extends SearchParamsProps {
    userId: string;
    email?: string | null;
}

const QuestionTab = async ({ searchParams, userId, email }: Props) => {

    const result = await getUserQuestions({ userId, page: 1 })


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
        </>
    )
}

export default QuestionTab