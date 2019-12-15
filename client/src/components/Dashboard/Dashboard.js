import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import Login from '../Auth/sub/Login';

import { AuthContext } from '../../App';
import AuthService from '../../services/Auth';

const Dashboard = props => {
    const { authLevel, setAuthLevel, isLogged, setIsLogged, username, setUsername, pastes, setPastes, joined } = useContext(AuthContext);

    function dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    const joinedDate = new Date(joined);
    const now = new Date(Date.now());
    const difference = dateDiffInDays(joinedDate, now );

    const handleLogout = () => {
        AuthService.logout()
            .then((res) => {
                if (res === 'Successfully logged out!') {
                    setAuthLevel(0);
                    setIsLogged(false);
                    setUsername('');
                    setPastes([]);

                    window.location.reload(false);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="container db">
            {username !== '' ?
                <React.Fragment>
                    <h1>Welcome {username}!</h1>
                    <p>You have pasted <Link to={`/pastes/${username}`} className="db-link">{pastes.length}</Link> pieces of code.</p>
                    <p>You have been a proud member of DevBin for <em>{difference.toString()}</em> day(s).</p>

                    {authLevel > 1 ? <p>You are an administrator!</p> : '' }

                    <button className="btn-submit" onClick={handleLogout}>Logout</button>
                </React.Fragment>
                :
                <Redirect to='/login' />
            }
        </div>
    );
}

export default Dashboard;