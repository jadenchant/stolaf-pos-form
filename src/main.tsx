import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import NotFound from './pages/NotFound';
import {Wrapper} from './components/Wrapper';
import App from './App';
import StudentHome from './pages/student/home';
import FacultyHome from './pages/faculty/home';
import DirectorHome from './pages/director/home';
import Form from './pages/form/form';

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
  {
    path: '/faculty',
    element: <FacultyHome />,
  },
  {
    path: '/director',
    element: <DirectorHome />,
  },
  {
    path: '/form',
    element: <Form />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>,
);
