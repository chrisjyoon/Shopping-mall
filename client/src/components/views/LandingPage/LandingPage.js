import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import styles from './LandingPage.module.css';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState();
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate ();
  

  useEffect(() => {
    let body = {
        skip: Skip,
        limit: Limit,
        loadMore: false
    }
    getProducts(body);
   
  },[])

  // useEffect (() =>{
  //   axios.get('/api/hello/')
  //     .then(response => console.log(response.data))
  // },[]);

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

  const renderCard = products && products.map((product,index) => {

    return <Col key={index}>
      <Card>
        <a href={`/product/${product._id}`}>
          <Card.Img variant="top" className={styles.image} src={`http://localhost:5000/uploads/${product.images[0]}`} />
        </a>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{`$${product.price}`}</Card.Text>
          </Card.Body>
      </Card>
    
    </Col> 
  })

  const loadMoreHandler = () => {
    let skips = Skip + Limit;
    let body = {
      skip: skips,
      limit: Limit,
      loadMore: true,
      searchTerm: searchTerms
    }
    getProducts(body);
    setSkip(skips);
 
  };

  const getProducts = body => {
    axios.post('/api/products/products', body)
    .then(response => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else { 
          alert('failed to fetch product information');
      }
    }) 
  }

  const updateSearchTerm = (newSearchTerm) => {
    const body = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm
    }
    setSkip(0);
    setSearchTerms(newSearchTerm);
    getProducts(body);
  };

  return (
    <div className={styles.ladingContainer}>
      <div className={styles.renderCard} >
        <h2>Shopping Item</h2>
        {/* Search for products  */}
        <div>
          <SearchFeature 
            refreshFunction={updateSearchTerm}
          />
        </div>
        {/* cards */}
        <Row xs={1} md={2} lg={4} className="g-4">
          {renderCard}
        </Row>

        {postSize >= Limit &&
          <div className={styles.loadmoreBtnWrapper}>
            <Button variant="primary" onClick={loadMoreHandler}>
                Load More
            </Button>
          </div>
        }  

      </div>
    </div>
  )
}

export default Auth(LandingPage, null)
