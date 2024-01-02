import {configureStore} from "@reduxjs/toolkit";
import asyncActionMiddleware from "./middlewares/asyncActionMiddleware.js";
import uiSlice from "./slices/uiSlice.js";
import diseaseSlice from "./slices/diseaseSlice.js";
import symptomsSlice from "./slices/symptomsSlice.js";
import ruleSlice from "./slices/ruleSlice.js";
import authSlice from "./slices/authSlice.js";
import userSlice from "./slices/userSlice.js";

const setupStore = () => configureStore({
    reducer: {
        ui: uiSlice.reducer,
        diseases: diseaseSlice.reducer,
        symptoms: symptomsSlice.reducer,
        rules: ruleSlice.reducer,
        auth: authSlice.reducer,
        users: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
})

export default setupStore;