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
import {ListRoadmapPage} from "@/pages/main/Roadmap/ListRoadmapPage.jsx";
import {CreateRoadmapPage} from "@/pages/main/Roadmap/CreateRoadmapPage.jsx";
import {DetailRoadmapPage} from "@/pages/main/Roadmap/DetailRoadmapPage.jsx";
import {ListMaterialPage} from "@/pages/main/Materials/ListMaterialPage.jsx";
import {CreateMaterialPage} from "@/pages/main/Materials/CreateMaterialPage.jsx";
import {DetailMaterialPage} from "@/pages/main/Materials/DetailMaterialPage.jsx";
import ProtectedRoute from "@/Middlewares/ProtectedRoute.jsx";
import NotProtectedRoute from "@/Middlewares/NotProtectedRoute.jsx";

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
        element:<ProtectedRoute><ToolsLayout /></ProtectedRoute>,
        children: [
            {
                path: 'generative-list-question',
                element: <ListQuestionPage/>,
            },
            {
                path: 'generative-lms',
                element: <LMSPage/>,
            },
            {
                path: 'generative-roadmap',
                element: <ListRoadmapPage/>,
            },
            {
                path: 'generative-roadmap/create',
                element: <CreateRoadmapPage/>,
            },
            {
                path: 'generative-roadmap/detail/:id',
                element: <DetailRoadmapPage/>,
            },
            {
                path: 'generative-material',
                element: <ListMaterialPage/>,
            },
            {
                path: 'generative-material/create',
                element: <CreateMaterialPage/>,
            },
            {
                path: 'generative-material/detail/:id',
                element: <DetailMaterialPage/>,
            },
        ],
    },
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title="Please try again later." />,
        element: <NotProtectedRoute><AuthLayout /></NotProtectedRoute>,
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