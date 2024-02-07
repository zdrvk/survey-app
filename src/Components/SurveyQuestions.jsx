import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './QuestionEditor';

export default function SurveyQuestions({ survey, onSurveyUpdate }) {
    const [model, setModel] = useState({ ...survey });

    const addQuestion = () => {
        setModel({
            ...model,
            questions: [
                ...model.questions,
                {
                    id: uuidv4(),
                    type: 'text',
                    question: '',
                    description: '',
                    data: {},
                },
            ],
        });
    };

    const questionChange = (question) => {
        if (!question) return;
        const newQuestion = model.questions.map((q) => {
            if (q.id === question.id) {
                return { ...question };
            }
            return q;
        });
        setModel({
            ...model,
            questions: newQuestion,
        });
    };

    const deleteQuestion = (question) => {
        const newQuestions = model.questions.filter((q) => q.id !== question.id);
        setModel({
            ...model,
            questions: newQuestions,
        });
    };

    useEffect(() => {
        onSurveyUpdate(model);
    }, [model]);

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='text-xl font-bold'>Questions</h3>
                <button
                    type='button'
                    className='flex items-center text-sm py-1 px-4 text-white bg-gray-500 hover:bg-gray-700 rounded-md'
                    onClick={addQuestion}
                >
                    <PlusIcon className='w-4 mr-2' />
                    Add Question
                </button>
            </div>
            {model.questions.length ? (
                model.questions.map((q, index) => (
                    <QuestionEditor
                        key={q.id}
                        index={index}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className='text-gray-400 text-center py-4'>
                    You don't have any questions created
                </div>
            )}
        </>
    );
}
