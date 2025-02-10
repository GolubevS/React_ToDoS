export const filterSliceName = 'filter';

export const ToDoFilters = {
    ALL: 'all',
    COMPLETED: 'completed',
    ACTIVE: 'active'
} as const;

export type ToDoFilters = typeof ToDoFilters[keyof typeof ToDoFilters];