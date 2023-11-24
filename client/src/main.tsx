import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.tsx';
import Chat from './pages/Chat.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/chat',
        element: (
            <PrivateRoute>
                <Chat />
            </PrivateRoute>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
