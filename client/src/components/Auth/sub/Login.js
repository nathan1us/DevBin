import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Nope from 'nope-validator';

import { AuthContext } from '../../../App';
import AuthService from '../../../services/Auth';
import Notification from '../../Notification/Notification';

const UserSchema = Nope.object().shape({
    username: Nope.string()
        .atLeast(3, 'Please provide a longer username! (min: 3)')
        .atMost(32, 'Your username is too long! (max: 32)')
        .required(),
    password: Nope.string()
        .atLeast(8, 'Please provide a longer passwords! (min: 8)')
        .required()
});

const Login = props => {
    const [errors, setErrors] = useState([]);
    const [username, setLoginUsername] = useState('');
    const [password, setLoginPassword] = useState('');

    const { setIsLogged, setPastes, setUsername } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const result = UserSchema.validate({ username, password });

        if (result !== undefined) {
            if (result.username) setErrors(errors => [...errors, result.username]);
            if (result.password) setErrors(errors => [...errors, result.password]);
        } else {
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
    }

    return (
        <form className="db-form db-form-login" onSubmit={handleSubmit}>
            <h1>Login page</h1>

            <Notification errors={errors} />

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