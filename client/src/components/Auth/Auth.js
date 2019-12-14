import React from 'react';

import './Auth.css';

import Login from './sub/Login';
import Register from './sub/Register';

const Auth = props => {
    const { pathname } = props.location;

    return (
        <div className="container">
            {pathname === '/login' && <Login {...props} />}
            {pathname === '/register' && <Register {...props} />}
        </div>
    );
}

export default Auth;