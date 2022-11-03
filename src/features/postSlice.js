import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: '',
    error: null,
}

const postUrl = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(postUrl);

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

export const deletePosts = createAsyncThunk('posts/deletePosts',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch(`${postUrl}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error('Can`t delete. Server Error')
            }

            dispatch(deletePost(id));

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addPostByUser = createAsyncThunk('posts/addPostsByUser',
    async (post, { rejectWithValue, dispatch }) => {
        try {
            
            const res = await fetch(postUrl, {
                method: "POST",
                body: JSON.stringify(post),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!res.ok) {
                throw new Error('Can`t add post. Server Error')
            }

            const data = await res.json();
            dispatch(addPost(data));

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: setError,
        [deletePosts.rejected]: setError,
    }
})

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;