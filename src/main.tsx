import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
