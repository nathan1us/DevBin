import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nope from 'nope-validator';

import Notification from '../../Notification/Notification';
import AuthService from '../../../services/Auth';

const UserSchema = Nope.object().shape({
    username: Nope.string()
        .atLeast(3, 'Please provide a longer username! (min: 3)')
        .atMost(32, 'Your username is too long! (max: 32)')
        .required(),
    password: Nope.string()
        .atLeast(8, 'Please provide a longer passwords! (min: 8)')
        .required(),
    repeatPassword: Nope.string()
        .oneOf([Nope.ref('password')], "The provided passwords don't match!")
        .required()
});

const Register = props => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const result = UserSchema.validate({ username, password, repeatPassword });

        if (result !== undefined) {
            if (result.username) setErrors(errors => [...errors, result.username]);
            if (result.password) setErrors(errors => [...errors, result.password]);
            if (result.repeatPassword) setErrors(errors => [...errors, result.repeatPassword]);
        } else {
            const requestData = {
                username,
                password
            }

            AuthService.register(requestData)
                .then((res) => {
                    if (typeof res === 'object') {
                        props.history.push('/login');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <form className="db-form db-form-register" onSubmit={handleSubmit}>
            <h1>Register page</h1>

            <Notification errors={errors} />

            <label htmlFor="register-username">Username</label>
            <input name="username" id="register-username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="register-password">Password</label>
            <input name="password" type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor="register-repeatPassword">Repeat Password</label>
            <input name="repeatPassword" type="password" id="register-repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />

            <button type="submit" className="btn-submit">Register</button>

            <Link to="/login" className="form-link">Have an account already?</Link>
        </form>
    );
}

export default Register;