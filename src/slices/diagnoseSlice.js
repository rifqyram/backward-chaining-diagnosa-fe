import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const diagnoseAction = createAsyncThunk('diagnose/action', RequestHelper);

const diagnoseSlice = createSlice({
    name: 'diagnose',
    initialState: {
        diagnoses: [],
    },
    extraReducers: (builder) => {
        builder.addCase(diagnoseAction.fulfilled, (state, {payload}) => {
            state.diagnoses = payload.data;
        });
    }
})


export default diagnoseSlice;