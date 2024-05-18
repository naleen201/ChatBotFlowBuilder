import React, { useState, useEffect } from 'react';
import './ErrorToast.css';

function ErrorToast({error}) {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        if (error) {
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    }, [error]);

    return (
        <div>
            <div id='ErrorToastContainer' className={show ? 'show' : ''}>
                <div id='ErrorToast'>{error && error.message}</div>
            </div>
        </div>
    );
}

export default ErrorToast;