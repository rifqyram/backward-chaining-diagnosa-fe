import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const diseaseAction = createAsyncThunk('disease/action', RequestHelper);

const diseaseSlice = createSlice({
    name: 'disease',
    initialState: {
        diseases: [],
    },
    extraReducers: (builder) => {
        builder.addCase(diseaseAction.fulfilled, (state, {payload}) => {
            state.diseases = payload.data;
        });
    }
})


export default diseaseSlice;