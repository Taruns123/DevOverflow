import Question from '@/components/forms/Question'
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserByEmailId } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const Page = async ({ params }: ParamsProps) => {
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
    const currentUserEmail = user.email;

    if (!currentUserEmail) return null;

    const mongoUser = await getUserByEmailId({ email: currentUserEmail })
    const result = await getQuestionById({ questionId: params.id })

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

            <div className="mt-9">
                <Question
                    type="Edit"
                    mongoUserId={mongoUser._id}
                    questionDetails={JSON.stringify(result)}
                />
            </div>
        </>
    )
}

export default Page