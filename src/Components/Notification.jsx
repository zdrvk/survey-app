import React, { useState } from 'react';
import { useStateContext } from '../Contexts/ContextProvider';

export default function Notification() {
    const { notification, setNotification } = useStateContext();
    return (
        <>
            {notification.show && (
                <div className='fixed top-3 z-50 w-full flex justify-center notification-animation'>
                    <div className='w-[250px] text-center py-2 px-3 rounded-md text-white bg-green-700'>
                        {notification.message}
                    </div>
                </div>
            )}
        </>
    );
}
