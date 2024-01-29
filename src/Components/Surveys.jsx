import React, { useState } from 'react';
import Page from './Page';
import { useStateContext } from '../Contexts/ContextProvider';
import SurveyListItem from './SurveyListItem';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import TButton from './TButton';

export default function Surveys() {
    const { surveys } = useStateContext();
    console.log(surveys);

    const onDeleteClick = () => {
        console.log('On Delete click');
    };
    return (
        <Page
            title='Surveys'
            buttons={
                <TButton color='green' to='/surveys/create'>
                    <PlusCircleIcon className='h-6 w-6 mr-2' />
                    Create New
                </TButton>
            }
        >
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
                {surveys.map((survey) => (
                    <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
                ))}
            </div>
        </Page>
    );
}
