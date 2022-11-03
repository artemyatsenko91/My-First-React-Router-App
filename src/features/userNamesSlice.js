import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userNames: [],
    status: '',
    error: null,
}

export const fetchUserNames = createAsyncThunk('userNames/fetchUserNames',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!res.ok) {
                throw new Error('Server Error')
            }

            const responce = await res.json();
            return responce;
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

export const userNamesSlice = createSlice({
    name: 'userNames',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserNames.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchUserNames.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.userNames = action.payload;
        },
        [fetchUserNames.rejected]: setError,
    }
});

export default userNamesSlice.reducer;