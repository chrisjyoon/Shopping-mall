import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Auth from '../../../hoc/auth';
import styles from './DetailProductPage.module.css';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { addToCart } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';

function DetailProductPage(props) {
  const  { productId }  = useParams();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState([]);
  // const productId = props.match.params.productId;

  useEffect(() =>{
    axios.get(`/api/products/products_by_id?id=${productId}&type=single`)
      .then(response => {
        setProductDetail(response.data[0]);
      })
      .catch(err => alert(err))
  },[]);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId))
  };

  return (
    <div className={styles.postPage} >
      <div className={styles.title} >
          <h1>{productDetail.title}</h1>
      </div>

            <br />

            <Row>
                <Col lg={6} xs={12}>
                  <ProductImage detail={productDetail} />
                </Col>
                <Col lg={6} xs={12}>
                  <ProductInfo
                      addToCart={addToCartHandler}
                      detail={productDetail} />
                </Col>
            </Row>
        </div>
  )
}

export default Auth(DetailProductPage,null)
