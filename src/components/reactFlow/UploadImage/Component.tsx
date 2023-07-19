import React, {useEffect, useState} from 'react';
import {AnyObject}                  from 'interfaces';

const UploadAndDisplayImage = ({onChangeImage}: AnyObject) => {

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    onChangeImage(selectedImage);
  }, [selectedImage])

  return (
    <div style={{backgroundColor: '#eee', padding: 10, borderRadius: 4}}>
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          // @ts-ignore
          setSelectedImage(event.target.files[0]);
        }}
      />
      <br/>
      <br/>
      <button onClick={() => setSelectedImage(null)}>Удалить</button>
    </div>
  );
};

export default UploadAndDisplayImage;