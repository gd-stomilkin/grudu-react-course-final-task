import React from 'react';
import LoginForm from './pages/LoginForm';
import './App.css';
import SignUpForm from './pages/SignUpForm';
import Messages from './pages/Messages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkAuthorizedLoader, checkUnauthorizedLoader } from './utils/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';



const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        loader: checkAuthorizedLoader,
        element: <LoginForm />
    },
    {
        path: 'signup',
        loader: checkAuthorizedLoader,
        element: <SignUpForm />
    },
    {
        path: 'messager',
        loader: checkUnauthorizedLoader,
        element: <Messages />
    },

]);
function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
