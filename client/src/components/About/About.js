import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AboutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>Code sharing made <em>simple</em>.</h1>

                <p>DevBin is a web application for sharing code between developers. It aims to ease the work of CompSci students and developers.</p>
                <p>Built using the MERN stack, serving as a final project (exam) for the React.JS course at the Software University.</p>
                
                <a target="_blank" href="https://github.com/slaweykow/DevBin" className="about-link">Github Repository</a> | Licensed under the <a target="_blank" href="https://github.com/slaweykow/DevBin/blob/master/LICENSE.md" className="about-link">MIT</a> license 
            </div>
        );
    }
}

export default AboutComponent;