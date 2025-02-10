export const todoSliceName = 'todos';
export const maximumSymbolsAllowed = 20;

export const ToDoStatus = {
    IDLE: 'idle',
    PENDING: 'pending',
    ERROR: 'error'
} as const;

export type ToDo = {
    id: string,
    text: string,
    completed: boolean
}

export type ToDoState = {
    todos: ToDo[],
    status: typeof ToDoStatus[keyof typeof ToDoStatus],
    error?: string | null
}

export const textTooLongMessage = (_literals: TemplateStringsArray, ...placeholders: number[]) =>
    `Maximum ${maximumSymbolsAllowed} symbols allowed (${placeholders[0]} symbols received)`;