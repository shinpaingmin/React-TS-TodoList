import React from 'react';
import './style.css';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <>
        <form className='input' onSubmit={handleAdd}>
            <input type="text" 
                    placeholder='Enter a new task ...'
                    className='inputBox' 
                    value={todo} 
                    onChange={(e) => setTodo(e.target.value)} />
            <button type='submit' className='addBtn'><i className='fa-solid fa-plus'></i>Add</button>
        </form>
    </>
  )
}

export default InputField