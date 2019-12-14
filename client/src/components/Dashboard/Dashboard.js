import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container db">
                <h1>Welcome [name]!</h1>
                <p>You have pasted <Link to="/pastes/:id" className="db-link">[pastesAmount]</Link> pieces of code.</p>
                <p>You have been a proud member of DevBin for <em>[days/months/years]</em>.</p>

                <h2>Click <Link to="/pastes/:id" className="db-link">here</Link> if you wish to edit your profile.</h2>

                <hr />

                <h1>Administrator zone</h1>

                <p>DevBin is currently used by <em>[number]</em> registered developers and is the home to <em>[number]</em> pieces of code.</p>

                <Link to="/pastes/:id" className="db-link">User management</Link> | <Link to="/pastes/:id" className="db-link">Admin management</Link>
            </div>
        );
    }
}

export default DashboardComponent;