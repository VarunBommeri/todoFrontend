import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = ({ token }) => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/todos', {
                    headers: { Authorization: token }
                });
                setTodos(res.data);
            } catch (err) {
                alert('Failed to fetch todos');
            }
        };
        fetchTodos();
    }, [token]);

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/todos', { description, status: 'pending' }, {
                headers: { Authorization: token }
            });
            setTodos([...todos, { description, status: 'pending' }]);
            setDescription('');
        } catch (err) {
            alert('Failed to add todo');
        }
    };

    const updateTodo = async (id, status) => {
        try {
            await axios.put(`http://localhost:3000/api/todos/${id}`, { status }, {
                headers: { Authorization: token }
            });
            setTodos(todos.map(todo => todo.id === id ? { ...todo, status } : todo));
        } catch (err) {
            alert('Failed to update todo');
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/todos/${id}`, {
                headers: { Authorization: token }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            alert('Failed to delete todo');
        }
    };

    return (
        <div>
            <form onSubmit={addTodo}>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.description} - {todo.status}
                        <button onClick={() => updateTodo(todo.id, todo.status === 'pending' ? 'completed' : 'pending')}>
                            {todo.status === 'pending' ? 'Complete' : 'Undo'}
                        </button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
