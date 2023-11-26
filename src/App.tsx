import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import { listenerCount } from 'process';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  // data binding with input box
  const [todo, setTodo] = useState<string>("");
  
  // todo list arr
  const [todos, setTodos] = useState<Todo[]>([]);

  // handle add btn
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isComplete: false}]);

      setTodo("");
    }
  }

  console.log(todos);

  return (
    <div>
        <header className='heading'>Start by doing what's necessary</header>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
