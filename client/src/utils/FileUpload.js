import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './FileUpload.module.css';
import Axios from 'axios';


function FileUpload(props) {
  const [images, setImages] = useState ([]);
  const [loading, setLoading] = useState(false);

  const onDrop = files => {
    //파일을 업로드 할  떄 작성해야 되는 부ㄴ
    // setLoading(true);
    const formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' } // 어떤 내용의 파일인지 
    }
    formData.append("file", files[0]) //어떤 파일을 첨부할지 

    Axios.post('/api/products/uploadImage',formData, config)
      .then(response => {
        if (response.data.success) {
          console.log('yogida1:FileUpload:',response.data) 
          setImages([...images, response.data.fileName])
          console.log('yogida2:images:',images)
          props.refreshFunction([...images, response.data.fileName])
        } else {
          alert('Failed to save the Image in Server') 
        }
      })
    // setLoading(false);
  }

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images]
    newImages.splice(currentIndex, 1)

    setImages(newImages)
    props.refreshFunction(newImages)
  }


   return (
    <div className={styles.container}>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
       
      <div className={styles.imgbox}>
        {images.map((image, index) => { 
          const pic = `http://localhost:5000/uploads/${image}`
          // const pic = image.replace(/:/g, '/');
          console.log(pic);
          return (<div key={index} onClick={onDelete}> 
            <img className={styles.image} src={pic} alt={`productImg-${index}`} />
              {/* <img src="http://localhost:5000/uploads/2022-04-26T05:54:21.422Zcaptainmarvel.png" /> */}
              {/* <img src="/images/captainmarvel.png" /> */}
          </div>)
          
          }
        )}
        {/* {images.map((image, index) => {
          const pic = image.replace(/:/g, '/');
          console.log(pic);
          (<div className={styles.image} key={index} onClick={onDelete}> 
              <img src="http://localhost:5000/uploads/2022-04-26T05/54/21.422Zcaptainmarvel.png" />
              <img src="/images/captainmarvel.png" />
          </div>
          )
        }
        )}showUP  */}
      </div>

    </div>
  )
}

export default FileUpload