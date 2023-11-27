import React from 'react'
import './style.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  return (
    <>
        <div className="container">
            <Droppable droppableId='TodosList'>
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className='todo__heading blue'>Active Tasks</h1>
                            {
                                todos.map((todo, index) => (
                                    <SingleTodo index={index}
                                                key={todo.id}
                                                todo={todo}
                                                todos={todos}
                                                setTodos={setTodos}
                                                completedTodos={completedTodos}
                                                setCompletedTodos={setCompletedTodos}
                                                bgColor="bg-blue" />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            
            <Droppable droppableId='TodosRemove'>
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className='todo__heading green'>Completed Tasks</h1>
                                {
                                    completedTodos.map((todo, index) => (
                                        <SingleTodo index={index}
                                                    key={todo.id}
                                                    todo={todo}
                                                    todos={completedTodos}
                                                    setTodos={setCompletedTodos}
                                                    completedTodos={[]}
                                                    setCompletedTodos={() => {}}
                                                    bgColor="bg-green" />
                                    ))
                                }
                                {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    </>
  )
}

export default TodoList