import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todoUrl = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(todoUrl);

            if (!res.ok) {
                throw new Error('');
            }
            
            const data = await res.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch(`${todoUrl}/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Can\'t delete task');
            }

            dispatch(removeTodo({ id }));

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)

export const toggleStatus = createAsyncThunk('todos/toggleStatus',
    async (id, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todo.todos.find(todo => todo.id === id);

        try {
            const res = await fetch(`${todoUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });

            if (!res.ok) {
                throw new Error('Can\'t toggle status');
            }

            dispatch(toggleComplete({ id }));

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)

export const addNewTodo = createAsyncThunk('todos/addNewTodo',
    async ({text, id}, { rejectWithValue, dispatch }) => {

        try {
            const todo = {
                title: text,
                userId: +id,
                completed: false,
            }

            const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            });

            if (!res.ok) {
                throw new Error('Can\'t add task');
            }

            const data = await res.json();
            dispatch(addTodo(data));

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
        [addNewTodo.rejected]: setError,
    }
});

const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;