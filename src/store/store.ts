import { configureStore } from '@reduxjs/toolkit';
import todos from '@/features/todos/todoSlice';
import filter from '@/features/filter/filterSlice';

const store = configureStore({
    reducer: {
        todos,
        filter
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;