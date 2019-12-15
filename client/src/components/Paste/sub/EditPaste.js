import React, { useEffect, useState, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { AuthContext } from '../../../App';

import PasteSerice from '../../../services/Paste';

import '../Paste.css';

const ViewPaste = props => {
    const { authLevel, isLogged, username } = useContext(AuthContext);
    const id = props.pasteId;

    const [captcha, setCaptcha] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        PasteSerice.get(id)
            .then((res) => {
                if (typeof res === 'object')
                    setContent(res.content);
                    setTitle(res.title);
            })
            .then()
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (captcha === '' || captcha === null) return;

        const data = {
            title,
            content
        }

        PasteSerice.edit(id, data)
            .then((res) => {
                props.history.push(`/view/${id}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <h2>Editting a paste</h2>

            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            
            <ReCAPTCHA theme="dark" sitekey="6LevRccUAAAAAKBJ4D4F_ysTmvEz2btdnKBt3nda" onChange={val => setCaptcha(val)} />

            <button
                className="btn-submit"
                onClick={handleSubmit}>
                Submit
            </button>
        </React.Fragment>
    );
}

export default ViewPaste;