import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todoSlice';
import postSlice from '../features/postSlice';
import albumsSlice from '../features/albumSlice';
import userInfoSlice from '../features/userInfoSlice';
import userNamesSlice from '../features/userNamesSlice';

export default configureStore({
    reducer: {
        userName: userNamesSlice,
        userInfo: userInfoSlice,
        album: albumsSlice,
        todo: todoSlice,
        post: postSlice,
    },
});