import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react'
import AnswerCard from '../cards/AnswerCard';


interface Props extends SearchParamsProps {
    userId: string;
    email?: string | null;
}

const AnswersTab = async ({ serachParams, userId, email }: Props) => {

    const result = await getUserAnswers({ userId, page: 1 })

    return (
        <>

            {
                result.answers.map((answer) => (
                    <AnswerCard key={answer._id}
                        _id={answer._id}
                        email={email}
                        question={answer.question}
                        author={answer.author}
                        upvotes={answer.upvotes.length}
                        createdAt={answer.createdAt}
                    />
                ))
            }
        </>
    )
}

export default AnswersTab