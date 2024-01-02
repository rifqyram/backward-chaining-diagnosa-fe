import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const symptomsAction = createAsyncThunk('symptoms/action', RequestHelper);

const symptomsSlice = createSlice({
    name: 'symptoms',
    initialState: {
        symptoms: [],
    },
    extraReducers: (builder) => {
        builder.addCase(symptomsAction.fulfilled, (state, {payload}) => {
            state.symptoms = payload.data;
        });
    }
})


export default symptomsSlice;