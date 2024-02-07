import React, { useState } from 'react';
import Page from './Page';
import { PhotoIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios';
import TButton from './TButton';
import { Navigate, useNavigate } from 'react-router-dom';
import SurveyQuestions from './SurveyQuestions';

export default function SurveyPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [survey, setSurvey] = useState({
        title: '',
        slug: '',
        status: false,
        description: '',
        image: null,
        image_url: null,
        expire_date: '',
        questions: [],
    });

    const onImageChoose = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result,
            });

            e.target.value = '';
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(survey);
        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        axiosClient
            .post('/survey', payload)
            .then((res) => {
                console.log(res);
                navigate('/surveys');
            })
            .catch((error) => {
                setError(error.response.data);
                console.log(error);
            });
    };

    function onSurveyUpdate(survey) {
        setSurvey({ ...survey });
    }

    return (
        <Page title='Create new survey'>
            <form action='#' method='POST' onSubmit={onSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md'>
                    <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                        <div>
                            <label className='block text-xl font-bold text-gray-700'>Photo</label>
                            <div className='mt-1 flex items-center'>
                                {survey.image_url && (
                                    <img
                                        src={survey.image_url}
                                        alt=''
                                        className='w-32 h-32 object-cover'
                                    />
                                )}
                                {!survey.image_url && (
                                    <span className='flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                                        <PhotoIcon className='w-8 h-8' />
                                    </span>
                                )}
                                <button
                                    type='button'
                                    className='relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                >
                                    <input
                                        type='file'
                                        className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                                        onChange={onImageChoose}
                                    />
                                    Change
                                </button>
                            </div>
                        </div>
                        {/*Title*/}
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='title'
                                className='block text-xl font-bold text-gray-700'
                            >
                                Survey Title
                            </label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                value={survey.title}
                                onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                                placeholder='Survey Title'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        <small className='text-red-500'>
                            {error?.errors?.title && error.errors.title}
                        </small>
                        {/*Description*/}
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='description'
                                className='block text-xl font-bold text-gray-700'
                            >
                                Description
                            </label>
                            {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                            <textarea
                                name='description'
                                id='description'
                                value={survey.description || ''}
                                onChange={(e) =>
                                    setSurvey({ ...survey, description: e.target.value })
                                }
                                placeholder='Describe your survey'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            ></textarea>
                        </div>
                        {/*Description*/}
                        {/*Expire Date*/}
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='expire_date'
                                className='block text-xl font-bold text-gray-700'
                            >
                                Expire Date
                            </label>
                            <input
                                type='date'
                                name='expire_date'
                                id='expire_date'
                                value={survey.expire_date}
                                onChange={(e) =>
                                    setSurvey({ ...survey, expire_date: e.target.value })
                                }
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        <small className='text-red-500 py-2'>
                            {error?.errors?.expire_date && error.errors.expire_date}
                        </small>
                        {/*Expire Date*/}

                        <SurveyQuestions survey={survey} onSurveyUpdate={onSurveyUpdate} />

                        <div className=' px-4 py-3 text-right sm:px-6 flex flex-col sm:flex-row gap-6'>
                            <div className='flex flex-row gap-6'>
                                <TButton>Save</TButton>
                                {/*Active*/}
                                <div className='flex items-start self-center'>
                                    <div className='flex h-5 items-center'>
                                        <input
                                            id='status'
                                            name='status'
                                            type='checkbox'
                                            checked={survey.status}
                                            onChange={(e) =>
                                                setSurvey({ ...survey, status: e.target.checked })
                                            }
                                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                        />
                                    </div>
                                    <div className='ml-3 text-sm'>
                                        <label
                                            htmlFor='comments'
                                            className='font-medium text-gray-700'
                                        >
                                            Make&nbsp;active
                                        </label>
                                    </div>
                                </div>
                                {/*Active*/}
                            </div>
                            {error && (
                                <div className='bg-red-500 text-white py-2 px-3 rounded-lg w-full text-left'>
                                    {error.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
}
