import React from 'react'
import "./UserCardBlock.css";
import Auth from '../../../../hoc/auth';

function UserCardBlock(props) {

  const renderCartImage = (images) => {
    console.log(images);
    if (images.length > 0) {
        let image = images[0]
        return `http://localhost:5000/uploads/${image}`
    }
  }

  const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images)} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td>
                   {/* 장바구니가 여러개일때 각각을 구분하기 위해 id를 파라미터로 넘겨준다.  */}
                  {/* <button onclick={() => props.removeItem(product._id)}> */}
                  <button onClick={() => props.removeItem(product._id)}>
                    Remove
                  </button>
                </td>
            </tr>
        ))
  )

  return (
      <div>
          <table>
              <thead>
                  <tr>
                      <th>Product Image</th>
                      <th>Product Quantity</th>
                      <th>Product Price</th>
                      <th>Remove from Cart</th>
                  </tr>
              </thead>
              <tbody>
                  {renderItems()} 
              </tbody>
          </table>
      </div>
  )
  }

export default Auth(UserCardBlock,true);
