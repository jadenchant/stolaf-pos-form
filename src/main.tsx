import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App';
import StudentHome from './pages/student/home';
import FacultyHome from './pages/faculty/home';
import StudentForm from './pages/form/StudentForm';
import FacultyForm from './pages/form/FacultyForm';
import NotFound from './pages/NotFound';
import {Wrapper} from './components/Wrapper';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';

const router = createBrowserRouter([
  {
    path: '/stolaf-pos-form/',
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
    // element: <DirectorHome />,
    element: <FacultyHome />,
  },
  {
    path: '/student/form/:id',
    element: <StudentForm />,
  },
  {
    path: '/faculty/form/:id',
    element: <FacultyForm />,
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
