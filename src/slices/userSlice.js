import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const userAction = createAsyncThunk('user/action', RequestHelper);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    extraReducers: (builder) => {
        builder.addCase(userAction.fulfilled, (state, {payload}) => {
            state.users = payload.data;
        });
    }
})


export default userSlice;