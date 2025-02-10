import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ToDoStatus } from "../typesTodos";
import { addTodoAsync } from "../thunksTodos";
import { addTodo, selectStatus } from "../todoSlice";
import { useRef } from "react";

interface AddTodoFormFields extends HTMLFormControlsCollection {
    newTodo: HTMLInputElement
}

interface AddTodoFormElements extends HTMLFormElement {
    readonly elements: AddTodoFormFields
}

interface AddTodoProps {
    isAsync: boolean
}

const AddTodo = ({isAsync}: AddTodoProps) => {
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const formRef = useRef<HTMLFormElement>(null);

    const isPending = status === ToDoStatus.PENDING;

    const handleSubmit = async(e: React.FormEvent<AddTodoFormElements>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const { elements } = form;
        const text = elements.newTodo.value;

        isAsync 
        ? dispatch(addTodoAsync(text)) 
        : dispatch(addTodo(text));
    }

    if(status === ToDoStatus.IDLE && formRef.current)
        formRef.current.reset();

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <input
                name='newTodo'
                type='text'
                required
            />
            <button
                disabled={isPending}
            >
                Add todo
            </button>
        </form>
    )
}

export default AddTodo;