import React, { useEffect, useState, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { AuthContext } from '../../App';

import './Home.css';

const Home = props => {
    const { isLogged, username } = useContext(AuthContext);

    return (
        <div className="container">
            <h2>{isLogged ? `Welcome, ${username}!` : 'Note: You are not logged in. You will not be able to edit or delete anything you paste.'}</h2>
            <textarea
                placeholder="// Happy pasting :)"
                onChange={e => this.handleChange(e.target.value)}
            />

            <ReCAPTCHA theme="dark" sitekey="6LevRccUAAAAAKBJ4D4F_ysTmvEz2btdnKBt3nda" onChange={val => this.handleCaptcha(val)} />

            <button
                className="btn-submit"
                onClick={() => this.onSubmit()}>
                Submit
                </button>
        </div>
    );
}

export default Home;

/*
class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            captcha: '',
            paste: ''
        }
    }

    handleCaptcha = val => {
        if (val === null) val = 'expired';
        this.setState({ captcha: val });
    }

    handleChange = input => {
        this.setState({ paste: input });
    }

    onSubmit = () => {
        if (this.state.captcha === 'expired' ||
            this.state.captcha === '' ||
            this.state.captcha === null) {
            return console.log('Please verify you are not a robot.');
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Note: You are not logged in. You will not be able to edit or delete anything you paste.</h2>

                <textarea
                    placeholder="// Happy pasting :)"
                    onChange={e => this.handleChange(e.target.value)}
                />

                <ReCAPTCHA theme="dark" sitekey="6LevRccUAAAAAKBJ4D4F_ysTmvEz2btdnKBt3nda" onChange={val => this.handleCaptcha(val)} />

                <button
                    className="btn-submit"
                    onClick={() => this.onSubmit()}>
                    Submit
                </button>
            </div>
        );
    }
}
*/