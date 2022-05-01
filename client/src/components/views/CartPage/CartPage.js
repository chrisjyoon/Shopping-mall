import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Auth from '../../../hoc/auth'
import { getCartItems, removeCartItem } from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)
  const [ShowSuccess, setShowSuccess] = useState(false)

  useEffect(() => {

      let cartItems = [];
      //Redux User State의 cart안에 상품이 들어있는지 확인
      if (props.user.userData && props.user.userData.cart) {
        if (props.user.userData.cart.length > 0) {
          props.user.userData.cart.forEach(item => {
                  cartItems.push(item.id)
              });
              dispatch(getCartItems(cartItems, props.user.userData.cart))
                  .then((response) => {
                      if (response.payload.length <= 0) {
                          setShowTotal(false)
                      } else {
                          calculateTotal(response.payload)
                      }
                  })
          }
      }

  }, [props.user.userData])

  const calculateTotal = (cartDetail) => {
    let total = 0;
 
    cartDetail && cartDetail.map(item => {
        total += parseInt(item.price, 10) * item.quantity
    });

    setTotal(total)
    setShowTotal(true)
  }

  const removeFromCart = (productId) => {

    console.log('###',productId);
    dispatch(removeCartItem(productId))
    .then(response => {
              if (response.payload.productInfo.length <= 0) {
                  setShowTotal(false)
              } else {
                  calculateTotal(response.payload.productInfo)
              }
          })
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock 
          products={props.user.cartDetail} 
          removeItem={removeFromCart} 
        />
      </div>

        {ShowTotal ?
            <div style={{ marginTop: '3rem' }}>
                <h2>Total amount: ${Total} </h2>
            </div>
            :
            // ShowSuccess ?
            //   <Result
            //       status="success"
            //       title="Successfully Purchased Items"
            //   /> :
            //   <div style={{
            //       width: '100%', display: 'flex', flexDirection: 'column',
            //       justifyContent: 'center'
            //   }}>
            <>
              <br />
              <h2>No Items In the Cart</h2>
            </>
                  

        } 
      </div>
  )
}

export default Auth(CartPage,true) //로그인한 사람만 이용가능
