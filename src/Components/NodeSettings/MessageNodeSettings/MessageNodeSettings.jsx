import React, { useState } from 'react'
import './MessageNodeSettings.css'

function MessageNodeSettings({node , onUpdate}) {

    const handleChange = (message) => {
        node.data.message = message;
        onUpdate();
    }

    return (
        <>
            <form action="">
                <label htmlFor="messageText">Text</label>
                <input type="text" id='messageText' name='messageText' defaultValue={node.data.message} onChange={(e) => handleChange(e.target.value)}/>
            </form>
        </>
    )
}

export default MessageNodeSettings