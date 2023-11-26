import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import './style.css'

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    // useStates for edit todo
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    // useRef for focusing input box 
    const inputRef = useRef<HTMLInputElement>(null);

    // handle edit action
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        // update todo
        setTodos(todos.map((todo) => todo.id === id ? {...todo, todo: editTodo} : {...todo}));

        setEdit(false);
    }

    // handle delete action
    const handleDelete = (id: number) => {
        // delete task
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // complete action handling
    const handleComplete = (id: number) => {
        // turn true to the completed task
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isComplete: true} : {...todo}));
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <>
            <form className='single_todo' onSubmit={(e) => handleEdit(e, todo.id)}>
                {
                    !edit ? (
                        todo.isComplete ? (
                            <span className='line-through'>{todo.todo}</span>
                        ) :(
                            <span>{todo.todo}</span>
                        )
                    ) : (
                        <input type="text" 
                                ref={inputRef}
                                value={editTodo} 
                                onChange={(e) => setEditTodo(e.target.value)} />
                    )
                }
                <div>
                    <span className="icon" onClick={() => !edit && !todo.isComplete ? setEdit(true) : setEdit(false)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </span>
                    <span className="icon" onClick={() => handleComplete(todo.id)}>
                        <i className="fa-solid fa-square-check"></i>
                    </span>
                </div>
            </form>
        </>
  )
}

export default SingleTodo