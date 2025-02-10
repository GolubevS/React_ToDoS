import { 
    createSelector,
    createSlice, 
    isFulfilled, 
    isPending, 
    isRejected, 
    nanoid, 
    PayloadAction 
} from '@reduxjs/toolkit';
import { 
    ToDoStatus, 
    maximumSymbolsAllowed, 
    ToDo, 
    todoSliceName, 
    ToDoState, 
    textTooLongMessage
} from './typesTodos';
import { 
    addTodoAsync, 
    removeTodoAsync, 
    toggleCompletedAsync 
} from './thunksTodos';
import { selectFilter } from '../filter/filterSlice';
import { ToDoFilters } from '../filter/typesFilter';

const initialState: ToDoState = {
    todos: [],
    status: ToDoStatus.IDLE
};

const todoSlice = createSlice({
    name: todoSliceName,
    initialState: initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<ToDo>) => {
                const newTodo = action.payload;
                const symbolsReceived = newTodo.text.length;

                if(symbolsReceived > maximumSymbolsAllowed) {
                    state.status = ToDoStatus.ERROR;
                    state.error = textTooLongMessage`${symbolsReceived}`;
                } else {
                    state.todos.push(action.payload);
                    state.status = ToDoStatus.IDLE;
                }
            },
            prepare: (text: string) => ({
                payload: {
                    id: nanoid(),
                    text,
                    completed: false
                }
            })
        },
        removeTodo: (state, action: PayloadAction<string>) => (
            {
                ...state, 
                status: ToDoStatus.IDLE, 
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        ),
        toggleCompleted: (state, action: PayloadAction<string>) => {
            state.status = ToDoStatus.IDLE;
            const updatedTodo = state.todos.find(todo => todo.id === action.payload);

            if(updatedTodo)
                updatedTodo.completed = !updatedTodo.completed;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTodoAsync.fulfilled, (state, action) => 
                ({...state, todos: [...state.todos, action.payload]})
            )
            .addCase(removeTodoAsync.fulfilled, (state, action) => 
                ({...state, todos: state.todos.filter(todo => todo.id !== action.payload)})
            )
            .addCase(toggleCompletedAsync.fulfilled, (state, action) => {
                const updatedTodo = state.todos.find(todo => todo.id === action.payload);
    
                if(updatedTodo)
                    updatedTodo.completed = !updatedTodo.completed;
            })
            .addMatcher(isPending, (state) => 
                ({...state, status: ToDoStatus.PENDING, error: null})
            )
            .addMatcher(isFulfilled, (state) => 
                ({...state, status: ToDoStatus.IDLE, error: null})
            )
            .addMatcher(isRejected, (state, action) => 
                ({...state, status: ToDoStatus.ERROR, error: action.error.message})
            )
    },
    selectors: {
        selectAllTodos: state => state.todos,
        selectStatus: state => state.status,
        selectError: state => state.error
    }
});

export const {
    addTodo, 
    removeTodo,
    toggleCompleted
} = todoSlice.actions;

export const {
    selectAllTodos,
    selectStatus,
    selectError
} = todoSlice.selectors;

export const selectVisibleTodos = createSelector(
    selectAllTodos,
    selectFilter,
    (todos, filter) => 
        filter === ToDoFilters.ALL 
        ? todos 
        : todos.filter(todo => todo.completed === (filter === ToDoFilters.COMPLETED))
);

export default todoSlice.reducer;