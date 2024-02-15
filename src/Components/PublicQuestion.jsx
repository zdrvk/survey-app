import React, { useEffect, useState } from 'react';

export default function PublicQuestion({ question, index, answerChanged }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    function onCheckboxChange(option, event) {
        const updatedOptions = [...selectedOptions];
        if (event.target.checked) {
            updatedOptions.push(option.uuid);
        } else {
            const index = updatedOptions.indexOf(option.uuid);
            if (index !== -1) {
                updatedOptions.splice(index, 1);
            }
        }
        setSelectedOptions(updatedOptions);
        console.log(updatedOptions);
        answerChanged(updatedOptions);
    }
    return (
        <>
            <fieldset>
                <div>
                    <legend className='text-base font-medium text-gray-900'>
                        {index + 1}. {question.question}
                    </legend>
                    <p className='text-gray-500 text-sm my-2 ml-2'>{question.description}</p>
                </div>
                <div>
                    {question.type === 'select' && (
                        <select
                            id='option'
                            name='option'
                            onChange={(e) => answerChanged(e.target.value)}
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ml-2'
                        >
                            <option key={`option_${index}_empty`} value=''>
                                Please Select
                            </option>
                            {question?.data?.options?.map((option) => (
                                <option key={option.uuid} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    )}
                    {question.type === 'radio' && (
                        <div>
                            {question?.data?.options?.map((option, index) => (
                                <div
                                    key={option.uuid}
                                    className='flex items-center text-center mb-1 ml-2'
                                >
                                    <input
                                        id={option.uuid}
                                        type='radio'
                                        name={'option' + question.id}
                                        value={option.text}
                                        onChange={(e) => answerChanged(e.target.value)}
                                        className='h-4 w-4 text-indigo-600 border-gray-300'
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'checkbox' && (
                        <div>
                            {question?.data?.options?.map((option, index) => (
                                <div key={option.uuid} className='flex items-center mb-1 ml-2'>
                                    <input
                                        id={option.uuid}
                                        onChange={(e) => onCheckboxChange(option, e)}
                                        type='checkbox'
                                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'text' && (
                        <div className='ml-2'>
                            <input
                                type='text'
                                id='text_answer'
                                name='text_answer'
                                onChange={(e) => answerChanged(e.target.value)}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                        </div>
                    )}
                    {question.type === 'textarea' && (
                        <div className='ml-2'>
                            <textarea
                                id='area_answer'
                                name='area_answer'
                                onChange={(e) => answerChanged(e.target.value)}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            ></textarea>
                        </div>
                    )}
                </div>
            </fieldset>
            <hr className='my-6' />
        </>
    );
}
