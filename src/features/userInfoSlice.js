import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userInfo: [],
    status: '',
    error: null,
}

export const fetchUser = createAsyncThunk('userInfo/fetchUser',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

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

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.userInfo = action.payload;
        },
        [fetchUser.rejected]: setError,
    }
});

export default userInfoSlice.reducer;