import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router.jsx';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { ContextProvider } from './Contexts/ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
    // OR
    // <React.StrictMode>
    //     <BrowserRouter>
    //         <App />
    //     </BrowserRouter>
    // </React.StrictMode>
);
