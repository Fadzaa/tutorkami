import { createBrowserRouter } from 'react-router-dom'
import AppLayout from "@/components/layouts/AppLayout.jsx";
import AuthLayout from "@/components/layouts/AuthLayout.jsx";
import Fallback from "@/components/fallback/Fallback.jsx";
import {LoginPage} from "@/pages/auth/LoginPage.jsx";
import {RegisterPage} from "@/pages/auth/RegisterPage.jsx";
import {LandingPage} from "@/pages/main/LandingPage.jsx";
import {ListQuestionPage} from "@/pages/main/ListQuestionPage.jsx";
import ToolsLayout from "@/components/layouts/ToolsLayout.jsx";
import {LMSPage} from "@/pages/main/LMSPage.jsx";

export const routers = createBrowserRouter([
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title="Please try again later." />,
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <LandingPage/>,
            }
        ],
    },
    {
        path: '/tools',
        errorElement: <Fallback body='Something went wrong' title="Please try again later." />,
        element: <ToolsLayout />,
        children: [
            {
                path: 'generative-list-question',
                element: <ListQuestionPage/>,
            },
            {
                path: 'generative-lms',
                element: <LMSPage/>,
            }
        ],
    },
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title="Please try again later." />,
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Fallback body='Page not found' title="404" />,
    },
])