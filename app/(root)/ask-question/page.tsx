import Question from '@/components/forms/Question'
import React from 'react'

const Page = () => {
    return (
        <div className='h1-bold text-dark100_light900'>
            <h1>Ask a question</h1>
            <div className='mt-9'>

                <Question />
            </div>
        </div>
    )
}

export default Page