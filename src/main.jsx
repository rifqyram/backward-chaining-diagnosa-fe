import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";

import setupRouter from "./router/router.jsx";
import ServiceProvider from "./context/ServiceContext.jsx";
import createServiceFactory from "./services/ServiceFactory.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-tooltip/dist/react-tooltip.css";

import './index.scss'
import {Provider} from "react-redux";
import setupStore from "./store.js";

const router = setupRouter();
const service = createServiceFactory();
const store = setupStore();


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <ServiceProvider service={service}>
            <RouterProvider router={router}/>
        </ServiceProvider>
        </Provider>
    </React.StrictMode>,
)
