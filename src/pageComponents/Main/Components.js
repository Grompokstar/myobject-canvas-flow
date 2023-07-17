import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  applyNodeChanges,
  Panel,
  useReactFlow
} from 'reactflow';
import FireExtinguisher from '../../components/reactFlow/CustomNode/Component';
import styles from './main-component.module.scss';

import 'reactflow/dist/style.css';

const nodeTypes = { fireExtinguisher: FireExtinguisher };

let id = 1;
const getId = () => `${id++}`;

const initialNodes = [
  { id: id,  type: 'fireExtinguisher', position: { x: 0, y: 0 }, data: { label: '3' } },
];

export default function MainPage() {
  const [nodes, setNodes] = useNodesState(initialNodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onAddNode = () => {
    const id = getId();

    const newNode = {
      id,
      type: 'fireExtinguisher',
      position: { x: 500, y: 500 },
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-left">
          <div className={styles.panel}>
            <button onClick={onAddNode}>
              Добавить новый элемент
            </button>
          </div>
        </Panel>
        {/*<Controls />*/}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
