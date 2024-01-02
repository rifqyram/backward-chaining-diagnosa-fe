

export default async (request, thunkAPI) => {
    try {
        return await request();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
}