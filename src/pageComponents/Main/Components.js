import React, {useCallback, useEffect, useState, useRef} from 'react';
import ReactFlow, {applyNodeChanges, Background, Panel, useNodesState, ReactFlowProvider } from 'reactflow';
import FireExtinguisher from 'components/reactFlow/FireExtinguisher/Component';
import RepairWorks from "components/reactFlow/RepairWorks/Component";
import UploadImage from 'components/reactFlow/UploadImage/Component';
import DownloadButton from "components/reactFlow/DownloadButton/Component";

import 'reactflow/dist/style.css';
import styles from './main-component.module.scss';

const nodeTypes = {
  fireExtinguisher: FireExtinguisher,
  RepairWorks: RepairWorks
};

let id = 1;
const getId = () => `${id++}`;

const initialNodes = [];

export default function MainPage() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  useEffect(() => {
    console.log(nodes)
  }, [nodes])

  const onChangeBackgroundImage = (image) => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      const viewport = document.getElementsByClassName('react-flow__viewport')[0];
      viewport.style.backgroundImage = `url(${imageUrl})`;
      setBackgroundImage(imageUrl);
    } else {
      setBackgroundImage('');
      const viewport = document.getElementsByClassName('react-flow__viewport')[0];
      viewport.style.backgroundImage = `url('')`;
    }
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeId = getId();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - 30,
        y: event.clientY - reactFlowBounds.top - 30,
      });

      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type} node`,
          onDelete: () => {
            reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== nodeId))
          }
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className={styles.page_container}>
      <ReactFlowProvider>
        <div className={styles.panel}>
          <button
            className={styles.panel_button}
            onDragStart={(event) => onDragStart(event, 'fireExtinguisher')}
            draggable
          >
            <img src="/images/nodeIcons/fire_extinguisher.png"/>
          </button>
          <button
            className={styles.panel_button}
            onDragStart={(event) => onDragStart(event, 'RepairWorks')}
          >
            <img src="/images/nodeIcons/repair.png"/>
          </button>
        </div>
        <div className={styles.reactflow_wrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            //style={{backgroundImage: `url(${backgroundImage})`}}
          >
            <Panel position="bottom-right">
              <UploadImage onChangeImage={onChangeBackgroundImage}/>
            </Panel>
            {/*<Controls />*/}
            <Background variant="dots" gap={12} size={1}/>
            <DownloadButton/>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
