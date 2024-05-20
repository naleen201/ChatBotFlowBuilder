import React, { Children, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import MessageNodeSettings from './MessageNodeSettings/MessageNodeSettings'

import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './NodeSettings.css'

function DefaultNodeSettings() {
    return (
        <div>Settings not available</div>
    );
}

function NodeSettings({node, hideSettings, onUpdate, setToBeDeleted, onDelete}) {
    let NodeSetting;
    switch (node.type) {
        case 'messageNode':
            NodeSetting = <MessageNodeSettings node={node} onUpdate={onUpdate}/>;
            break;
        default:
            NodeSetting = DefaultNodeSettings;
    }

    return (
        <div id='SettingsPanel'>
            <div id='SettingsTitleBar'>
                <div id='BackButton' onClick={hideSettings}><FontAwesomeIcon icon={faArrowLeft} size='xl' /></div>
                <div id='SettingsTitle'>{node.data.nodeName} Node</div>
                <div id='DeleteButton' onClick={() => {onDelete(node);}}><FontAwesomeIcon icon={faTrashCan} size='lg'/></div>
            </div>
            <div id='EditForm'>
                {NodeSetting}
            </div>
        </div>
    )
}

export default NodeSettings