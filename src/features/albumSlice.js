import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    albums: [],
    status: '',
    error: null,
}

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/albums');

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

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAlbums.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchAlbums.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.albums = action.payload;
        },
        [fetchAlbums.rejected]: setError,
    }
});

export default albumsSlice.reducer;