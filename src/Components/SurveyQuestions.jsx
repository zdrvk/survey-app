import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './QuestionEditor';

export default function SurveyQuestions({ questions, onQuestionsUpdate }) {
    const [myQuestions, setMyQuestions] = useState([...questions]);

    const addQuestion = (index) => {
        const newIndex = index !== 0 ? index : myQuestions.length;
        myQuestions.splice(newIndex, 0, {
            id: uuidv4(),
            type: 'text',
            question: '',
            description: '',
            data: {},
        });
        setMyQuestions([...myQuestions]);
        onQuestionsUpdate(myQuestions);
    };

    const questionChange = (question) => {
        if (!question) return;
        const newQuestion = myQuestions.map((q) => {
            if (q.id === question.id) {
                return { ...question };
            }
            return q;
        });
        setMyQuestions(newQuestion);
        onQuestionsUpdate(newQuestion);
    };

    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions);
    };

    useEffect(() => {
        setMyQuestions(questions);
    }, [questions]);

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='text-xl font-bold'>Questions</h3>
                <button
                    type='button'
                    className='flex items-center text-sm py-1 px-4 text-white bg-gray-500 hover:bg-gray-700 rounded-md'
                    onClick={() => addQuestion(0)}
                >
                    <PlusIcon className='w-4 mr-2' />
                    Add Question
                </button>
            </div>
            {myQuestions.length ? (
                myQuestions.map((q, index) => (
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
