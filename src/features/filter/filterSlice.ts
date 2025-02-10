import { 
    createSlice, 
    PayloadAction 
} from '@reduxjs/toolkit';
import { 
    filterSliceName,
    ToDoFilters, 
} from './typesFilter';

const initialState = ToDoFilters.ALL as ToDoFilters;

const filterSlice = createSlice({
    name: filterSliceName,
    initialState,
    reducers: {
        setFilter: (_, action: PayloadAction<ToDoFilters>) => action.payload
    },
    selectors: {
        selectFilter: state => state
    }
});

export const { setFilter } = filterSlice.actions;
export const { selectFilter } = filterSlice.selectors;

export default filterSlice.reducer;