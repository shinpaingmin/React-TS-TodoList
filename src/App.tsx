import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  // light/ dark mode
  const [dark, setDark] = useState<boolean>(false);

  // data binding with input box
  const [todo, setTodo] = useState<string>("");
  
  // todo list arr
  const [todos, setTodos] = useState<Todo[]>([]);

  // completed todo
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // handle add btn
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isComplete: false}]);

      setTodo("");
    }
  }

  console.log(todos);

  // custom function
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    console.log(result);

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
        active = todos,
        complete = completedTodos;

    // remove specific todo from source
    if(source.droppableId === 'TodosList') {
        add = active[source.index];
        add.isComplete = true;
        active.splice(source.index, 1);
    } else {
        add = complete[source.index];
        add.isComplete = false;
        complete.splice(source.index, 1);
    }

    // add todo to destination
    if(destination.droppableId === 'TodosList') {
        active.splice(destination.index, 0, add);
    } else {
        complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTodos(complete);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className={dark ? "bg-dark" : "bg-white"}>
          {
            !dark ? (
              <i className="fa-solid fa-moon mode" title='switch mode' onClick={() => setDark(!dark)}></i>
            ) : (
              <i className={`fa-solid fa-sun mode ${dark ? 'bg-yellow' : ""}`} title='switch mode' onClick={() => setDark(!dark)}></i>
            )
          }
          <header >
            <h1 className='heading'>Add Tasks ...</h1>
          </header>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
          <TodoList todos={todos} setTodos={setTodos}
                    completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        </div>
    </DragDropContext>
  );
}

export default App;
