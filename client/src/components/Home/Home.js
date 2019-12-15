import React, { useEffect, useState, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { AuthContext } from '../../App';

import PasteSerice from '../../services/Paste';

import './Home.css';

const Home = props => {
    const { isLogged, username } = useContext(AuthContext);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [captcha, setCaptcha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (captcha === '' || captcha === null) return;
        if (content === '') return;

        const author = username === '' ? 'anonymous' : username;

        const data = {
            author,
            title,
            content
        }

        PasteSerice.create(data)
            .then((res) => {
                if (typeof res === 'object') {
                    const pasteId = res._id;
                    props.history.push(`/view/${pasteId}`);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="container">
            <h2>{isLogged ? `Welcome, ${username}!` : 'Note: You are not logged in. You will not be able to edit or delete anything you paste.'}</h2>
            
            <input placeholder="// Paste title" onChange={(e) => setTitle(e.target.value)} />

            <textarea
                placeholder="// Happy pasting :)"
                onChange={(e) => setContent(e.target.value)}
            />

            <ReCAPTCHA theme="dark" sitekey="6LevRccUAAAAAKBJ4D4F_ysTmvEz2btdnKBt3nda" onChange={val => setCaptcha(val)} />

            <button
                className="btn-submit"
                onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default Home;