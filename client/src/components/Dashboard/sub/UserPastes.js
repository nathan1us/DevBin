import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../../../App';
import AuthService from '../../../services/Auth';

import './UserPastes.css'

const UserPastes = props => {
    const { authLevel, setAuthLevel, isLogged, setIsLogged, username, setUsername, pastes, setPastes, joined } = useContext(AuthContext);

    return (
        <div className="container db">
            {isLogged ?
                <React.Fragment>
                    <h1>Your pastes:</h1>

                    <div className="pastes">
                        {pastes.map((paste, index) => {
                            return <React.Fragment>
                                <h2><Link to={`/view/${paste._id}`}>{paste.title}</Link></h2>
                                
                                Pasted on {moment(paste.pastedOn).format('DD.MM.YYYY - HH:mm')}
                                <div className="line"></div></React.Fragment>
                        })}
                    </div>

                </React.Fragment>
                :
                <Redirect to='/login' />
            }

        </div>
    );
}

export default UserPastes;