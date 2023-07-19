import React                 from 'react';
import {Panel, useReactFlow} from 'reactflow';
import {toPng}               from 'html-to-image';
import {useWindowSize}       from 'hooks/useWindowSIze';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}


function DownloadButton() {
  const {getNodes} = useReactFlow();
  const {width, height} = useWindowSize();

  const onClick = () => {
    //const nodesBounds = getRectOfNodes(getNodes());
    //const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    // @ts-ignore
    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#fff',
      width: width,
      height: height,
      style: {
        width: width,
        height: height,
        //transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="top-right">
      <button className="download-btn" onClick={onClick} style={{fontSize: 18}}>
        Скачать схему
      </button>
    </Panel>
  );
}

export default DownloadButton;
