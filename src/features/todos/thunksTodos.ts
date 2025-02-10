import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { 
    maximumSymbolsAllowed, 
    textTooLongMessage, 
    ToDo, 
    todoSliceName 
} from './typesTodos';

const timeout = 2000;

export const addTodoAsync = createAsyncThunk(`${todoSliceName}/addTodo`, 
    (text: string) => new Promise<ToDo>((resolve, reject) => setTimeout(() => {
        const symbolsReceived = text.length;

        if(symbolsReceived > maximumSymbolsAllowed) {
            reject(textTooLongMessage`${symbolsReceived}`)
        } else {
            resolve({
                id: nanoid(),
                text,
                completed: false
            })
        }
    }
    , timeout)));

export const removeTodoAsync = createAsyncThunk(`${todoSliceName}/removeTodo`, 
    (todoId: string) => new Promise<string>((resolve) => setTimeout(() => resolve(todoId), timeout)));

export const toggleCompletedAsync = createAsyncThunk(`${todoSliceName}/toggleCompleted`, 
    (todoId: string) => new Promise<string>((resolve) => setTimeout(() => resolve(todoId), timeout)));