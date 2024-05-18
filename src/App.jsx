import { useEffect, useState } from 'react'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import FlowBuilder from './Components/FlowBuilder/FlowBuilder'
import NodeMenu from './Components/NodeMenu/NodeMenu'
import NodeSettings from './Components/NodeSettings/NodeSettings'
import SidePanel from './Components/SidePanel/SidePanel'

function App() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [node, setNode] = useState(null);
    const [update, setUpdate] = useState(false);

    const showSettings = (node) => {
        setNode(node);
        setIsSettingsVisible(true);
    };

    const hideSettings = () => {
        setNode(null);
        setIsSettingsVisible(false);
    };

    return (
        <div id='AppContainer'>
            <NavBar />
            <div id='BuilderContainer'>
                <FlowBuilder showSettings={showSettings} update={update}/>
                <SidePanel>{isSettingsVisible ? <NodeSettings node={node} hideSettings={hideSettings} onUpdate={()=>setUpdate(!update)}/> : <NodeMenu />}</SidePanel>
            </div>
        </div>
    )
}

export default App
