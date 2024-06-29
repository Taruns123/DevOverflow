import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'


const questions = [
    {
        _id: "1",
        title: "What is TypeScript?",
        tags: [
            { _id: "101", name: "typescript" },
            { _id: "102", name: "javascript" }
        ],
        author: {
            _id: "201",
            name: "John Doe",
            picture: "https://example.com/johndoe.jpg"
        },
        upvotes: 10,
        views: 4000,
        answers: [],
        createdAt: new Date("2023-06-29T00:00:00Z")
    },
    {
        _id: "2",
        title: "How to use interfaces in TypeScript?",
        tags: [
            { _id: "103", name: "typescript" },
            { _id: "104", name: "interfaces" }
        ],
        author: {
            _id: "202",
            name: "Jane Smith",
            picture: "https://example.com/janesmith.jpg"
        },
        upvotes: 5,
        views: 500552,
        answers: [],
        createdAt: new Date("2024-06-28T00:00:00Z")
    },
    {
        _id: "3",
        title: "What are the benefits of using TypeScript?",
        tags: [
            { _id: "105", name: "typescript" },
            { _id: "106", name: "benefits" }
        ],
        author: {
            _id: "203",
            name: "Alice Johnson",
            picture: "https://example.com/alicejohnson.jpg"
        },
        upvotes: 20,
        views: 20000000,
        answers: [],
        createdAt: new Date("2024-06-27T00:00:00Z")
    }
];

const Home = () => {




    return (
        <>
            <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
                <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

                <Link href="/ask-question" className='flex justify-end max-sm:w-full'>
                    <Button className='primary-gradient !text-light-900 min-h-[46px] px-4 py-3'>
                        Ask a Question
                    </Button>
                </Link>
            </div>

            <div
                className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'
            >
                <LocalSearchbar
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for questions"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w[170px]"
                    containerClasses="hidden max-md:flex"
                />
            </div>


            <HomeFilters />
            <div className='mt-10 flex w-full flex-col gap-6'>
                {
                    (questions.length > 0) ?
                        questions.map((question) => (
                            <QuestionCard key={question._id}
                                _id={question._id}
                                title={question.title}
                                tags={question.tags}
                                author={question.author}
                                upvotes={question.upvotes}
                                views={question.views}
                                answers={question.answers}
                                createdAt={question.createdAt}
                            />
                        ))
                        : <NoResult
                            title="There&apos;s no questions to show"
                            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                            link="/ask-question"
                            linkTitle="Ask a question"
                        />
                }

            </div>

        </>
    )
}

export default Home