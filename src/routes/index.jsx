import { createBrowserRouter } from 'react-router-dom'
import AppLayout from "@/components/layouts/AppLayout.jsx";
import AuthLayout from "@/components/layouts/AuthLayout.jsx";
import Fallback from "@/components/fallback/Fallback.jsx";
import {LoginPage} from "@/pages/auth/LoginPage.jsx";
import {RegisterPage} from "@/pages/auth/RegisterPage.jsx";
import {LandingPage} from "@/pages/main/LandingPage.jsx";
import ToolsLayout from "@/components/layouts/ToolsLayout.jsx";
import {ListRoadmapPage} from "@/pages/main/Roadmap/ListRoadmapPage.jsx";
import {CreateRoadmapPage} from "@/pages/main/Roadmap/CreateRoadmapPage.jsx";
import {DetailRoadmapPage} from "@/pages/main/Roadmap/DetailRoadmapPage.jsx";
import {ListMaterialPage} from "@/pages/main/Materials/ListMaterialPage.jsx";
import {CreateMaterialPage} from "@/pages/main/Materials/CreateMaterialPage.jsx";
import {DetailMaterialPage} from "@/pages/main/Materials/DetailMaterialPage.jsx";
import ProtectedRoute from "@/Middlewares/ProtectedRoute.jsx";
import NotProtectedRoute from "@/Middlewares/NotProtectedRoute.jsx";
import {DetailQuestionPage} from "@/pages/main/Question/DetailQuestionPage.jsx";
import {CreateQuestionPage} from "@/pages/main/Question/CreateQuestionPage.jsx";
import {ListQuestionPage} from "@/pages/main/Question/ListQuestionPage.jsx";
import {ListLmsPage} from "@/pages/main/Lms/ListLmsPage.jsx";
import {CreateLmsPage} from "@/pages/main/Lms/CreateLmsPage.jsx";
import {DetailLmsPage} from "@/pages/main/Lms/DetailLmsPage.jsx";
import StorageLayout from "@/components/layouts/StorageLayout.jsx";
import {StorageRoadmapPage} from "@/pages/main/Storage/StorageRoadmapPage.jsx";
import {StorageQuestionPage} from "@/pages/main/Storage/StorageQuestionPage.jsx";
import {StorageMaterialPage} from "@/pages/main/Storage/StorageMaterialPage.jsx";
import {StorageLmsPage} from "@/pages/main/Storage/StorageLmsPage.jsx";

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
                path: 'generative-lms',
                element: <ListLmsPage/>,
            },
            {
                path: 'generative-lms/create',
                element: <CreateLmsPage/>,
            },
            {
                path: 'generative-lms/detail/:id',
                element: <DetailLmsPage/>,
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
            {
                path: 'generative-question',
                element: <ListQuestionPage/>,
            },
            {
                path: 'generative-question/create',
                element: <CreateQuestionPage/>,
            },
            {
                path: 'generative-question/detail/:id',
                element: <DetailQuestionPage/>,
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
        path: '/storage',
        errorElement: <Fallback body='Something went wrong' title="Please try again later." />,
        element: <ProtectedRoute><StorageLayout /></ProtectedRoute>,
        children: [
            {
                path: 'roadmap',
                element: <StorageRoadmapPage />,
            },
            {
                path: 'material',
                element: <StorageMaterialPage />,
            },        {
                path: 'question',
                element: <StorageQuestionPage />,
            },
            {
                path: 'lms',
                element: <StorageLmsPage />,
            },


        ],
    },
    {
        path: '*',
        element: <Fallback body='Page not found' title="404" />,
    },
])