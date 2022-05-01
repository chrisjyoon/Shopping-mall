import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
} from './types'

export function loginUser(dataToSubmit) {

  const request = axios.post('/api/users/login',dataToSubmit)
    .then(response => response.data)

  return {
    type: LOGIN_USER,
    payload: request
  }  
}

export function registerUser(dataToSubmit) {

  const request = axios.post('/api/users/register', dataToSubmit)
      .then(response => response.data)

  return {
      type: REGISTER_USER,
      payload: request
  }
}

export function auth() {

  const request = axios.get('/api/users/auth')
      .then(response => response.data)

  return {
      type: AUTH_USER,
      payload: request
  }
}

export function logoutUser() {
  const request = axios.get('/api/users/logout')
      .then(response => response.data);

  return {
      type: LOGOUT_USER,
      payload: request
  }
}


export function addToCart(_id) {
  let body = {
    productId: _id
  }

  const request = axios.post('/api/users/addToCart', body)
      .then(response => response.data);

  return {
      type: ADD_TO_CART,
      payload: request
  }
}

export function getCartItems(cartItems, userCart) {
  // cart items 이 여러개 일 수가 있어서 type=array를 준다.
  const request = axios.get(`/api/products/products_by_id?id=${cartItems}&type=array`)
      .then(response => {
          //CartItem들에 해당하는 정보들을 Product collection에서 가져온 후에  
          //Quatity 정보를 넣어준다
          userCart.forEach(cartItem => {
              response.data.forEach((productDetail, i) => {
                  if (cartItem.id === productDetail._id) {
                      response.data[i].quantity = cartItem.quantity;
                  }
              })
          })

          return response.data;
      });

  return {
      type: GET_CART_ITEMS,
      payload: request
  }
}

export function removeCartItem(productId) {
  const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
      .then(response => {
        // router users에서 만든 cartDetail, cart 를 조합해서 CartDetail을 다시 삭제후 모습으로 만든다.
          response.data.cart.forEach(item => {
              response.data.productInfo.forEach((product, index) => {
                  if (item.id === product._id) { //k는 cartDetail이다.
                      response.data.productInfo[index].quantity = item.quantity
                  }
              })
          })
          return response.data;
      });

  return {
      type: REMOVE_CART_ITEM,
      payload: request
  }
}