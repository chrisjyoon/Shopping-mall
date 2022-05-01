import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';

function ProductInfo(props) {
    const [Product, setProduct] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    const addToCarthandler = () => {
      // 필요한 정보를 Cart 필드에데가 넣어준다 cart -> id, quantity, date  
      dispatch(addToCart(props.detail._id)) 
        // props.addToCart(props.detail._id)
    }

    return (
        <div>
          <h2>Product Info</h2>
          <Row xs={1} md={3}>
            <Col>{`Price: ${Product.price}`}</Col>
            <Col>{`Sold: ${Product.sold}`}</Col>
            <Col>{`View: ${Product.view}`}</Col>
          </Row>
          <Row xs={1}>
            <Col>{`Description: ${Product.description}`}</Col>
          </Row>
            

            <br />
            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="danger" size="lg" onClick={addToCarthandler}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ProductInfo
