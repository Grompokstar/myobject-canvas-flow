import React, {useCallback, useEffect, useState, useRef} from 'react';
import ReactFlow, {applyNodeChanges, Background, Panel, useNodesState, ReactFlowProvider } from 'reactflow';
import CustomNode from 'components/reactFlow/CustomNode/Component';
import RepairWorks from "components/reactFlow/RepairWorks/Component";
import UploadImage from 'components/reactFlow/UploadImage/Component';
import DownloadButton from "components/reactFlow/DownloadButton/Component";
import {MARKERS} from "constants/common";

import 'reactflow/dist/style.css';
import styles from './main-component.module.scss';

const nodeTypes = {
  gas: CustomNode,
  fire_fighting: CustomNode,
  welding: CustomNode,
  temperature_measurement: CustomNode,
  control_valves: CustomNode,
  control_valves_blowdown: CustomNode,
  plug_removed: CustomNode,
  plug_installed: CustomNode,
  escape_routes: CustomNode,
  warning_signs: CustomNode,
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
          type: type,
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
          {MARKERS.map((item) => {
            return (
              <button
                key={item.type}
                className={styles.panel_button}
                onDragStart={(event) => onDragStart(event, item.type)}
                draggable
              >
                <img src={`/images/nodeIcons/${item.image}`}/>
              </button>
            )
          })}
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
