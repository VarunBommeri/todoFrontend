import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Todos from './components/Todos';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div>
            {!token ? (
                <>
                    <Register />
                    <Login setToken={setToken} />
                </>
            ) : (
                <Todos token={token} />
            )}
        </div>
    );
};

export default App;
