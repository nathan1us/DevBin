import React, { Component } from 'react';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h2>Note: You are not logged in. You will not be able to edit or delete anything you paste.</h2>
            </div>
        );
    }
}

export default HomeComponent;