import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Contexts/ContextProvider';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = useStateContext();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ['select', 'radio', 'checkbox'].includes(type);
    }

    function onTypeChange(e) {
        const newModel = {
            ...model,
            type: e.target.value,
        };
        if (!shouldHaveOptions(model.type) && shouldHaveOptions(e.target.value)) {
            if (!model.data.options) {
                newModel.data = {
                    options: [{ uuid: uuidv4(), text: '' }],
                };
            }
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: '',
        });
        setModel({ ...model });
    }

    return (
        <div>
            <div className='flex justify-between mb-3'>
                <h4>
                    {index + 1}. {model.question}
                </h4>
                <div className='flex items-center'>
                    <button
                        type='button'
                        className='flex rounded-md
                        items-center text-xs
                        py-1 px-3 mr-2
                        text-white
                        bg-gray-500
                        hover:bg-gray-700'
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className='w-4 mr-1' />
                        Insert
                    </button>
                    <button
                        type='button'
                        className='
                        font-semibold
                        flex items-center
                        text-xs py-1 px-3
                        rounded-md border
                        text-red-600
                        hover:text-white
                        bg-red-50
                        hover:bg-red-500
                        border-transparent
                        hover:border-red-600

          '
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className='w-4 mr-1' />
                        Delete
                    </button>
                </div>
            </div>
            <div className='flex gap-3 justify-between mb-3'>
                <div className='flex-1'>
                    <label htmlFor='question' className='block text-sm font-medium text-gray-700'>
                        Question
                    </label>
                    <input
                        type='text'
                        name='question'
                        id='question'
                        value={model.question || ''}
                        onChange={(e) => setModel({ ...model, question: e.target.value })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label
                        htmlFor='questionType'
                        className='block text-sm font-medium text-gray-700 w-40'
                    >
                        Question Type
                    </label>
                    <select
                        id='questionType'
                        name='questionType'
                        value={model.type || ''}
                        onChange={onTypeChange}
                        // onChange={(e) => setModel({ ...model, type: e.target.value })}
                        className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    >
                        {questionTypes.map((type) => (
                            <option value={type || ''} key={type}>
                                {upperCaseFirst(type)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='mb-3'>
                <label
                    htmlFor='questionDescription'
                    className='block text-sm font-medium text-gray-700'
                >
                    Description
                </label>
                <textarea
                    name='questionDescription'
                    id='questionDescription'
                    value={model.description || ''}
                    onChange={(e) => setModel({ ...model, description: e.target.value })}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                ></textarea>
            </div>
            <div>
                {shouldHaveOptions() && (
                    <div>
                        <h4 className='text-sm flex justify-start items-center gap-10 mb-2 font-medium text-gray-700'>
                            Options:
                        </h4>
                        {model?.data?.options?.length == 0 && (
                            <div className='text-xs text-gray-600 text-center py-3'>
                                You don't have any options defined
                            </div>
                        )}
                        {model?.data?.options?.length > 0 && (
                            <div className=''>
                                {model.data.options.map((option, index) => (
                                    <div
                                        key={option.uuid}
                                        className='flex gap-2 justify-between items-center mb-4'
                                    >
                                        <span className='text-s w-6'>{index + 1}. </span>
                                        <input
                                            type='text'
                                            value={option.text}
                                            onChange={(e) => {
                                                (option.text = e.target.value),
                                                    setModel({ ...model });
                                            }}
                                            className='
                                            py-1 px-2 rounded-md
                                            border-gray-300 border
                                            shadow-sm h-8 w-full text-xs
                                            focus:border-indigo-500'
                                        />
                                        <button
                                            type='button'
                                            className='
                                        h-8 w-8 ml-2 flex
                                        rounded-full
                                        items-center
                                        justify-center
                                        border border-transparent
                                        text-red-600
                                        hover:text-white
                                        bg-red-50
                                        hover:bg-red-500
                                        hover:border-red-600
                                        '
                                        >
                                            <TrashIcon className='m-1' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            type='button'
                            onClick={addOption}
                            className='
                                flex text-xs
                                items-center
                                py-1 px-2 mt-4
                                rounded-md
                                text-white
                                bg-gray-500
                                hover:bg-gray-700'
                        >
                            Add option
                            <PlusIcon className='w-4 ml-1' />
                        </button>
                    </div>
                )}
            </div>
            {model.type === 'select' && <div></div>}
        </div>
    );
}
