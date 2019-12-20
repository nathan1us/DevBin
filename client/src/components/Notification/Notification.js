import React from 'react';

import './Notification.css';

const Notification = ({errors}) => {
    const proccessErrors = errors => {
        return errors.map((error, index) => {
            return <p key={index} className="notification-error">{error}</p>
        });
    }

    return (
        
        <div className="notifications">
            {errors && proccessErrors(errors)}
        </div>
    )
}

export default Notification;