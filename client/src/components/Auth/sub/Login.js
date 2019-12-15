import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../App';
import AuthService from '../../../services/Auth';

const Login = props => {
    const [username, setLoginUsername] = useState('');
    const [password, setLoginPassword] = useState('');

    const { setIsLogged, setPastes, setUsername } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        }

        AuthService.login(data)
            .then((res) => {
                if (res.hasOwnProperty('authLevel') && res.hasOwnProperty('username')) {
                    setIsLogged(true);
                    setUsername(res.username);
                    setPastes(res.pastes);

                    props.history.push('/dashboard');
                } else {
                    console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <form className="db-form db-form-login" onSubmit={handleSubmit}>
            <h1>Login page</h1>

            <label htmlFor="login-username">Username</label>
            <input name="username" id="login-username" value={username} onChange={(e) => setLoginUsername(e.target.value)} />

            <label htmlFor="login-password">Password</label>
            <input name="password" type="password" id="login-password" value={password} onChange={(e) => setLoginPassword(e.target.value)} />

            <button type="submit" className="btn-submit">Login</button>
            <Link to="/register" className="form-link">Don't have an account?</Link>
        </form>
    );
}

export default Login;