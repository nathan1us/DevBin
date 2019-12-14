import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username,
            password,
            repeatPassword
        }

        // console.log('Data', data);
        // console.log(`Register form submitted: ${username} - ${password} - ${repeatPassword}`);
    }


    return (
        <form className="db-form db-form-register" onSubmit={handleSubmit}>
            <h1>Register page</h1>

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