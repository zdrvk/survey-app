import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';
import PublicQuestion from './PublicQuestion';
import { v4 as uuidv4 } from 'uuid';

export default function SurveyPublic() {
    const answers = {};
    const [survey, setSurvey] = useState([{ questions: [] }]);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
            setLoading(false);
            setSurvey(data.data);
        });
    }, []);

    function answerChanged(question, value) {
        answers[question.id] = value;
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(answers);
    }
    return (
        <div>
            {loading && <div className='flex justify-center'>Loading...</div>}
            {!loading && (
                <div className='max-w-7xl flex items-center m-auto'>
                    <form
                        id='survey'
                        name='survey'
                        className='max-w-5xl flex flex-col m-auto mt-10 p-8 bg-gray-200/50 rounded-md'
                        onSubmit={(e) => onSubmit(e)}
                    >
                        <div className='flex flex-col sm:flex-row gap-8 m-auto justify-center items-start mb-10'>
                            <div className='min-w-60 min-h-60'>
                                <img
                                    src={survey.image_url}
                                    className='object-cover max-w-60 max-h-60 '
                                    alt={`Image image for ${survey.title}`}
                                />
                            </div>
                            <div className='max-w-xl min-w-lg'>
                                <h1 className='text-3xl mb-3'>{survey.title}</h1>
                                <p className='text-gray-700 mb-4'>{survey.description}</p>
                                <p className='text-gray-500 text-sm'>
                                    Expires: {survey.expire_date}
                                </p>
                            </div>
                        </div>
                        <div className='max-w-4xl'>
                            {survey?.questions?.map((question, index) => {
                                return (
                                    <PublicQuestion
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        answerChanged={(value) => answerChanged(question, value)}
                                    />
                                );
                            })}
                        </div>
                        <button
                            type='submit'
                            className='inline-flex justify-center w-1/2 m-auto py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
