import React from 'react';

import './Paste.css';

import EditPaste from './sub/EditPaste';
import ViewPaste from './sub/ViewPaste';

const Paste = props => {
    const { pathname } = props.location;

    const id = props.match.params.id;
    const newProps = { ...props, pasteId: id} 

    return (
        <div className="container">
            {pathname === `/edit/${id}` && <EditPaste {...newProps} />}
            {pathname === `/view/${id}` && <ViewPaste {...newProps} />}
        </div>
    );
}

export default Paste;