import { 
    MouseEvent, 
    useMemo 
} from 'react';
import { 
    useAppDispatch, 
    useAppSelector 
} from '@/store/hooks'
import { 
    removeTodoAsync, 
    toggleCompletedAsync 
} from '../thunksTodos';
import { 
    removeTodo, 
    selectError, 
    selectStatus, 
    selectVisibleTodos, 
    toggleCompleted
} from '../todoSlice';
import { ToDoStatus } from '../typesTodos';
import AddTodo from './AddTodo';
import deleteUrl from '@/assets/delete.svg?inline';

interface TodosListProps {
    isAsync: boolean
}

const TodosList = ({isAsync}: TodosListProps) => {
    const visibleTodos = useAppSelector(selectVisibleTodos);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    const isPending = status === ToDoStatus.PENDING;
    const isError = status === ToDoStatus.ERROR;

    const sortedTodos = useMemo(() => 
        [...visibleTodos].sort((todoA, todoB) => todoA.text.localeCompare(todoB.text)
    ), [visibleTodos]);

    const handleRemoveTodo = (e: MouseEvent<HTMLAnchorElement>, todoId: string) => {
        e.preventDefault();

        isAsync 
        ? dispatch(removeTodoAsync(todoId))
        : dispatch(removeTodo(todoId));
    }

    const handleToggleCompleted = (todoId: string) => {
        isAsync
        ? dispatch(toggleCompletedAsync(todoId))
        : dispatch(toggleCompleted(todoId))
    }

    return (
        <div>
            <AddTodo isAsync={isAsync}/>
            <ul>
                {
                    sortedTodos.map(todo => 
                        <li 
                            key={todo.id}
                            className={todo.completed ? 'todo todo-completed' : 'todo'}
                        >
                            <span
                                className='todo-title'
                                title='Toggle todo completed'
                                onClick={() => handleToggleCompleted(todo.id)}
                            >
                                {todo.text}
                            </span>
                            <a
                                title='Remove todo'
                                className={isPending ? 'link-disabled' : ''}
                                onClick={(e) => handleRemoveTodo(e, todo.id)}
                            >
                                <img 
                                    className='icon' 
                                    src={deleteUrl}
                                />
                            </a>
                        </li>
                    )
                }
            </ul>
                { 
                    isError &&
                    <p className='error'>
                        {error}
                    </p>
                }
        </div>
    )
}

export default TodosList;