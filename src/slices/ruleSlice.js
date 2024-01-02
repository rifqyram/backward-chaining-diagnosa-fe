import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const ruleAction = createAsyncThunk('rule/action', RequestHelper);

const ruleSlice = createSlice({
    name: 'rule',
    initialState: {
        rules: [],
    },
    extraReducers: (builder) => {
        builder.addCase(ruleAction.fulfilled, (state, {payload}) => {
            state.rules = payload.data;
        });
    }
})


export default ruleSlice;