import React, { Children, useEffect } from 'react'
import MessageNodeSettings from './MessageNodeSettings/MessageNodeSettings'

import './NodeSettings.css'

function DefaultNodeSettings() {
    return (
        <div>Settings not available</div>
    );
}

function NodeSettings({node, hideSettings, onUpdate}) {
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
                <div id='BackButton' onClick={hideSettings}>Back</div>
                <div id='SettingsTitle'>{node.data.nodeName} Node</div>
            </div>
            <div>
                {NodeSetting}
            </div>
        </div>
    )
}

export default NodeSettings