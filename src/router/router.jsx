import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import BackofficeLayout from "../layout/BackofficeLayout.jsx";
import Login from "../pages/Login/index.jsx";
import Home from "../pages/Home/index.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Disease from "../pages/Disease/index.jsx";
import Symptoms from "../pages/Symptoms/index.jsx";
import KnowledgeBase from "../pages/KnowledgeBase/index.jsx";
import DiseaseList from "../pages/Disease/components/DiseaseList.jsx";
import DiseaseForm from "../pages/Disease/components/DiseaseForm.jsx";
import KnowledgeBasedForm from "../pages/KnowledgeBase/components/KnowledgeBasedForm.jsx";
import KnowledgeBasedList from "../pages/KnowledgeBase/components/KnowledgeBasedList.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import User from "../pages/User/index.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import Register from "../pages/Register/index.jsx";
import Diagnose from "../pages/Diagnose/index.jsx";
import DiagnoseList from "../pages/DiagnoseList/index.jsx";

const setupRouter = () =>
    createBrowserRouter([
        {
            path: '/',
            element: <App/>,
            errorElement: <>Error Cuyyy...</>,
            children: [
                {
                    path: '',
                    element: <MainLayout />,
                    children: [
                        {
                            index: true,
                            element: <Home />
                        },
                    ]
                },
                {
                    path: 'diagnoses',
                    element: <Diagnose />
                },
                {
                    path: 'diagnoses/list',
                    element: <DiagnoseList />
                },
                {
                    path: 'login',
                    element: <Login/>,
                },
                {
                    path: 'register',
                    element: <Register/>,
                },
                {
                    path: 'backoffice',
                    element: <BackofficeLayout/>,
                    children: [
                        {
                            index: true,
                            element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
                        },
                        {
                            path: 'diseases',
                            element: <ProtectedRoute><Disease/></ProtectedRoute>,
                            children: [
                                {
                                    index: true,
                                    element: <DiseaseList/>
                                },
                                {
                                    path: 'new',
                                    element: <DiseaseForm/>
                                },
                                {
                                    path: 'edit/:id',
                                    element: <DiseaseForm/>
                                }
                            ]
                        },
                        {
                            path: 'symptoms',
                            element: <ProtectedRoute><Symptoms/></ProtectedRoute>,
                            children: [
                                {
                                    path: ':id',
                                    element: <Symptoms/>
                                }
                            ]
                        },
                        {
                            path: 'knowledge-based',
                            element: <ProtectedRoute><KnowledgeBase/></ProtectedRoute>,
                            children: [
                                {
                                    index: true,
                                    element: <KnowledgeBasedList/>
                                },
                                {
                                    path: 'new',
                                    element: <KnowledgeBasedForm/>
                                },
                                {
                                    path: 'edit/:id',
                                    element: <KnowledgeBasedForm/>
                                }
                            ]
                        },
                        {
                            path: 'users',
                            element: <ProtectedRoute><User/></ProtectedRoute>,
                            children: [
                                {
                                    path: ':id',
                                    element: <User/>
                                }
                            ]
                        }
                    ],
                },
            ],
        },
    ]);

export default setupRouter;
