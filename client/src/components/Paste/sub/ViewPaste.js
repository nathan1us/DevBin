import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { AuthContext } from '../../../App';

import PasteSerice from '../../../services/Paste';

import '../Paste.css';

const ViewPaste = props => {
    const { authLevel, username } = useContext(AuthContext);

    const [paste, setPaste] = useState({});
    const id = props.pasteId;

    useEffect(() => {
        PasteSerice.get(id)
        .then((res) => {
            if (typeof res === 'object') {
                setPaste(res);
            } else {
                props.history.push('/');
            }
        })
        .then()
        .catch(err => {
            console.log(err);
        });
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault();

        PasteSerice.delete(id)
            .then((res) => {
                if (res === 'Successfully deleted!') {
                    props.history.push('/');
                }
            })
    }

    return (
        <React.Fragment>
            <h1>{paste.title} by <em>{paste.author}</em></h1>
            <p>Pasted on {moment(paste.pastedOn).format('DD.MM.YYYY - HH:mm')}</p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {paste.content}
            </SyntaxHighlighter>

            {authLevel > 1 || username === paste.author ?
                <React.Fragment>
                    <Link to={`/edit/${id}`}>
                        <button className="btn-submit btn-paste">Edit</button>
                    </Link>
                    <button onClick={(e) => handleDelete(e)} className="btn-submit btn-paste">Delete</button>
                </React.Fragment>
                :
                ''}
        </React.Fragment>
    );
}

export default ViewPaste;