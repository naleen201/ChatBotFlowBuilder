import React, { useCallback, useEffect } from 'react'
import './FlowBuilder.css'
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, addEdge, MarkerType, useReactFlow } from 'reactflow';

import 'reactflow/dist/style.css';

import CustomEdge from '../Edges/CustomEdge';

import MessageNode from '../Nodes/MessageNode'

const edgeTypes = {
    custom: CustomEdge,
};

const nodeTypes = {
    messageNode: MessageNode,
};



let id = -1;
const getId = () => `dndnode_${++id}`;

function FlowBuilder({ showSettings, update, onUpdate, setRfInstance}) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { setViewport } = useReactFlow();

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem('chatbot-flow'));
            const nodeId = localStorage.getItem('id');
            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                id = nodeId+1;
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => {
                // Check if an edge from the source handle already exists
                const existingEdge = eds.find(edge => edge.source === params.source && edge.sourceHandle === params.sourceHandle);
                if (existingEdge) {
                    // If it does, don't add a new edge
                    return eds;
                } else {
                    // If it doesn't, add the new edge
                    return addEdge({ ...params, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed } }, eds);
                }
            });
        },
        [],
    );

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow a drop
    };

    const handleDrop = useCallback(
        (event) => {
            event.preventDefault();
            const data = JSON.parse(event.dataTransfer.getData('application/reactflow-nodeData'));
            const type = event.dataTransfer.getData('application/reactflow-nodeType');
            const message = data.message + ' ' + id;
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = {
                x: event.clientX,
                y: event.clientY,
            };
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node`, ...data }
            };
            setNodes((nds) => nds.concat(newNode));
        }
    );

    useEffect(() => {
        console.log('update')
    }, [update])
    useEffect(() => {
        onRestore();
    }, []);
    return (
        <div
            id='FlowBuilderContainer'
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onNodeClick={(event, node) => { onUpdate(); showSettings(node); }}
                onInit={setRfInstance}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowBuilder