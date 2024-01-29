import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

export default function GuestLayout() {
    const { userToken } = useStateContext();
    if (userToken) {
        return <Navigate to='/' />;
    }
    return (
        <div>
            <>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm border rounded-lg border-black p-4'>
                        <img
                            className='mx-auto h-10 w-auto'
                            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                            alt='Company Logo'
                        />
                        <Outlet />
                    </div>
                </div>
            </>
        </div>
    );
}
