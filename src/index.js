import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterFrom';
import Dashboard from './Components/Dashboard/Dashboard';
import Logout from './Components/Dashboard/Logout';
import CompareTimeSlot from './Components/CompareTimeSlot/CompareTimeSlot';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/RegisterForm",
    element: <RegisterForm />,
  },
  {
    path: "/LoginForm",
    element: <LoginForm />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/CompareTimeSlot",
    element: <CompareTimeSlot />,
  },
  {
    path: "/Logout",
    element: <Logout />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
