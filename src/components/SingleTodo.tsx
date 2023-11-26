import React from 'react'
import { Todo } from '../model'
import './style.css'

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  return (
    <>
        <form className='single_todo'>
            <span>{todo.todo}</span>
            <div>
                <span className="icon">
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span className="icon">
                    <i className="fa-solid fa-trash"></i>
                </span>
                <span className="icon">
                    <i className="fa-solid fa-square-check"></i>
                </span>
            </div>
        </form>
    </>
  )
}

export default SingleTodo