import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  applyNodeChanges
} from 'reactflow';
import FireExtinguisher from '../../components/reactFlow/CustomNode/Component'

import 'reactflow/dist/style.css';

const nodeTypes = { fireExtinguisher: FireExtinguisher };

const initialNodes = [
  { id: '1',  type: 'fireExtinguisher', position: { x: 0, y: 0 }, data: { label: '3' } },
];

export default function MainPage() {
  const [nodes, setNodes] = useNodesState(initialNodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
