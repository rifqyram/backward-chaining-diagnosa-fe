import { error, loading, success } from "../slices/uiSlice";

const asyncActionMiddleware = ({ dispatch }) => (next) => (action) => {
    const { payload } = action;
    if (action.type.endsWith('/pending')) {
        dispatch(loading());
    }
    if (action.type.endsWith('/fulfilled')) {
        dispatch(success());
    }
    if (action.type.endsWith('/rejected')) {
        dispatch(error(payload));
    }

    return next(action);
}

export default asyncActionMiddleware;