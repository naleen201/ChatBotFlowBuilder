import React, { useEffect, useState, useCallback } from 'react'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import FlowBuilder from './Components/FlowBuilder/FlowBuilder'
import NodeMenu from './Components/NodeMenu/NodeMenu'
import NodeSettings from './Components/NodeSettings/NodeSettings'
import SidePanel from './Components/SidePanel/SidePanel'

import { ReactFlowProvider } from 'reactflow'

function App() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [node, setNode] = useState(null);
    const [update, setUpdate] = useState(false);
    const [rfInstance, setRfInstance] = useState(null);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem('chatbot-flow', JSON.stringify(flow));
            localStorage.setItem('id', flow.nodes.length);
        }
    }, [rfInstance]);

    const showSettings = (node) => {
        console.log(node);
        setNode(node);
        setIsSettingsVisible(true);
    };

    const hideSettings = () => {
        setNode(null);
        setIsSettingsVisible(false);
    };

    return (
        <div id='AppContainer'>
            <NavBar onSave={onSave}/>
            <div id='BuilderContainer'>
                <ReactFlowProvider><FlowBuilder showSettings={showSettings} update={update} onUpdate={()=>setUpdate(!update)} setRfInstance={setRfInstance}/></ReactFlowProvider>
                <SidePanel>{isSettingsVisible ? <NodeSettings node={node} hideSettings={hideSettings} onUpdate={()=>setUpdate(!update)}/> : <NodeMenu />}</SidePanel>
            </div>
        </div>
    )
}

export default App
