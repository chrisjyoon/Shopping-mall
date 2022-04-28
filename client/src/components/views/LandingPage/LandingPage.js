import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import styles from './LandingPage.module.css';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const navigate = useNavigate ();
  

  useEffect(() => {
    axios.post('/api/products/products')
      .then(response => {
        if(response.data.success) {
          setProducts(response.data.productInfo);
        } else { 
            alert('failed to fetch product information');
        }
      })
  })

  useEffect (() =>{
    axios.get('/api/hello/')
      .then(response => console.log(response.data))
  },[]);

  const onClickHandler = () => {
    axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                navigate("/login")
            } else {
                alert('fail to logout!!')
            }
        })
  }

  const renderCard = products.map((product,index) => {
    return <Col key={index}>
      <Card>
        <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.images[0]}`} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{`$${product.price}`}</Card.Text>
          </Card.Body>
      </Card>
    
    </Col>  
  })

  const loadMoreHandler = () => {

  };

  return (
    <div className={styles.ladingContainer}>
      <div className={styles.renderCard} >
        <h2>Shopping Item</h2>
        <Row xs={1} md={2} className="g-4">
          {renderCard}
        </Row>    
        <button onClick={loadMoreHandler}>
            더보기
        </button>

      </div>
    </div>
  )
}

export default Auth(LandingPage, null)
