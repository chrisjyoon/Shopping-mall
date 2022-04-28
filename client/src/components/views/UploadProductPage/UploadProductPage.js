import React, { useState } from 'react'
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import FileUpload from '../../../utils/FileUpload';
import Axios from 'axios';
import Auth from '../../../hoc/auth'
import { useNavigate } from 'react-router-dom';

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" }
]

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState ("")
  const [DescriptionValue, setDescriptionValue] = useState("")
  const [PriceValue, setPriceValue] = useState(0)
  const [Continent, setContinent] = useState(1)
  const [Images, setImages] = useState([])
  const navigate = useNavigate ();

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }

  const onDescriptionChange = (event) => {
      setDescriptionValue(event.currentTarget.value)
  }

  const onPriceChange = (event) => {
      setPriceValue(event.currentTarget.value)
  }

  const onContinentsSelectChange = (event) => {
      setContinent(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
      setImages(newImages)
  }

  const onSubmit = (event) => {
    event.preventDefault();
 
    if (!TitleValue || !DescriptionValue || !PriceValue ||
        !Continent|| !Images) {
        return alert('fill all the fields first!')
    }
    // 서버에 채ㄴ 값들을 request로 보낸다. 
    const variables = {
        writer: props.user.userData._id,
        title: TitleValue,
        description: DescriptionValue,
        price: PriceValue,
        images: Images,
        continents: Continent,
    }

    Axios.post('/api/products/uploadProduct', variables)
        .then(response => {
            if (response.data.success) {
                alert('Product Successfully Uploaded')
                navigate('/')
            } else {
                alert('Failed to upload Product')
            }
        })

}

  return (
    <div>
      <h1>Upload Product</h1>
      <Form onSubmit={onSubmit} >
        <FileUpload refreshFunction={updateImages} />
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">🎁</InputGroup.Text>
          <FormControl
            placeholder="Product Name"
            aria-label="ItemName"
            aria-describedby="basic-addon1"
            onChange={onTitleChange}
            value={TitleValue}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Description</InputGroup.Text>
          <FormControl 
            as="textarea" 
            aria-label="With textarea" 
            onChange={onDescriptionChange}
            value={DescriptionValue}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl 
            aria-label="Amount (to the nearest dollar)" 
            onChange={onPriceChange}
            value={PriceValue}
          />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <Form.Select 
          aria-label="Default select example"
          onChange={onContinentsSelectChange} 
          value={Continent}
        >
          <option >Continents you want to go </option>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </Form.Select>
        <br />
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
      </Form> 
    </div>
  )
}

export default Auth(UploadProductPage, true)
