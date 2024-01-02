import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        error: null,
        errorKey: 0,
    },
    reducers: {
        loading: (state) => {
            state.isLoading = true;
        },
        success: (state) => {
            state.isLoading = false;
        },
        error: (state, { payload }) => {
            const message = parseErrorMessage(payload);
            state.isLoading = false;
            state.errorKey += 1;
            state.error = message;
        },
    }
})

function parseErrorMessage(e) {
    if (e.response && e.response.data && e.response.data.message) {
        return e.response.data.message;
    } else if (typeof e === 'string') {
        return e;
    } else {
        return 'Terjadi Kesalahan.';
    }
}

export const { loading, success, error } = uiSlice.actions;

export default uiSlice;