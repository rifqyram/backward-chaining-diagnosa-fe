import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const authAction = createAsyncThunk('auth/login', RequestHelper);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        role: null,
    },
    extraReducers: (builder) => {
        builder.addCase(authAction.fulfilled, (state, {payload}) => {
            if (payload) {
                state.username = payload.username;
                state.role = payload.role
            }
        });
    }
})


export default authSlice;