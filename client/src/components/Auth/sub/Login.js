import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        }

        console.log('Data', data);
        console.log(`Login form submitted: ${username} - ${password}`);
    }

    return (
        <form className="db-form db-form-login" onSubmit={handleSubmit}>
            <h1>Login page</h1>

            <label htmlFor="login-username">Username</label>
            <input name="username" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="login-password">Password</label>
            <input name="password" type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" className="btn-submit">Login</button>
            <Link to="/register" className="form-link">Don't have an account?</Link>
        </form>
    );
}

export default Login;