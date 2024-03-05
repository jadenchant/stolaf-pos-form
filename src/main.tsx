import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';
import App from './App';
import StudentHome from './pages/student/home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
    },
    {
        path: '/student',
        element: <StudentHome />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
