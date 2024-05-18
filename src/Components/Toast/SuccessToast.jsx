import React, { useState, useEffect } from 'react';
import './SuccessToast.css';

function ErrorToast({success}) {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        if (success) {
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    }, [success]);

    return (
        <div>
            <div id='SuccessToastContainer' className={show ? 'show' : ''}>
                <div id='SuccessToast'>{success && success.message}</div>
            </div>
        </div>
    );
}

export default ErrorToast;