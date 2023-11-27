import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import './style.css'
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    bgColor: string;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos, completedTodos, setCompletedTodos, bgColor }) => {
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
        // turn true to the completed task, and add to completed todo 

        let done: Todo[] = todos.filter((todo) => todo.id === id);

        done[0].isComplete = true;
        
        setCompletedTodos([...completedTodos, ...done]);
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <>
            <Draggable draggableId={todo.id.toString()} index={index}>
                {
                    (provided) => (
                        <form className={`single_todo ${bgColor}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps}
                                {...provided.dragHandleProps} ref={provided.innerRef}>
                            {
                                !edit ? (
                                    todo.isComplete ? (
                                        <span className='line-through content'>{todo.todo}</span>
                                    ) :(
                                        <span className='content'>{todo.todo}</span>
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
                    )
                }
            </Draggable> 
        </>
  )
}

export default SingleTodo