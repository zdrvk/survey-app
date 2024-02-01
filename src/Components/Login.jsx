import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../Contexts/ContextProvider';

export default function Login() {
    const { setCurrentUser, setUserTokenMethod } = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ __html: '' });

    const onSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post('/login', {
                email: email,
                password: password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserTokenMethod(data.token);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    const finalErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    setError({ __html: finalErrors.join('<br>') });
                }
                console.log(error);
            });
    };
    return (
        <>
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Login to your account
            </h2>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={onSubmit} className='space-y-3' action='#' method='POST'>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Email address
                        </label>
                        <div className=''>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Password
                            </label>
                        </div>
                        <div className=''>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                requiredvalue={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8'
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                {error.__html && (
                    <div
                        className='bg-red-500 rounded py-2 px-3 text-white mt-8'
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Not a member?{' '}
                    <Link
                        to='/signup'
                        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                    >
                        Sign up for free!
                    </Link>
                </p>
            </div>
        </>
    );
}
