import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/board';

export default configureStore({
    reducer: {
        board: boardReducer,
    }
});