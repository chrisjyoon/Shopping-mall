/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link} from 'react-router-dom';
// import { Menu, Badge } from 'antd';
// import Icon from '@ant-design/icons';
// import {ShoppingCartOutlined} from '@ant-design/icons';
import {Nav, Badge} from 'react-bootstrap';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
// import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user)
  // const navigate = useNavigate ();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) return <Link to="/login" />
       else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Nav className="me-auto">
        <Nav.Link href="/login">SignIn</Nav.Link>
        <Nav.Link href="/register">SignUp</Nav.Link>
      </Nav>
    )
  } else {
    return (
      <Nav className="me-auto">
        <Nav.Link href="/history">History</Nav.Link>
        <Nav.Link href="product/upload">Upload</Nav.Link>
        <Nav.Link href="/user/cart" variant="primary">
          Cart<Badge pill bg="secondary">
            {user.userData && user.userData.cart.length }
          </Badge>
        </Nav.Link>
        <Nav.Link href="/login" onClick={logoutHandler}>logout</Nav.Link>
      </Nav>
    )
  }
}

export default RightMenu;

//     <Menu mode={props.mode}>
//       <Menu.Item key="mail">
//         <a href="/login">Signin</a>
//       </Menu.Item>
//       <Menu.Item key="app">
//         <a href="/register">Signup</a>
//       </Menu.Item>
//     </Menu>
// } else {
//   return (
//     <Menu mode={props.mode}>

//       <Menu.Item key="history">
//         <a href="/history">History</a>
//       </Menu.Item>

//       <Menu.Item key="upload">
//         <a href="/product/upload">Upload</a>
//       </Menu.Item>

//       <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
//         <Badge count={user.userData && user.userData.cart.length}>
//           <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
//             {/* <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} /> */}
//             <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
//           </a>
//         </Badge>
//       </Menu.Item>


//       <Menu.Item key="logout">
//         {/* <a onClick={logoutHandler}>Logout</a> */}
//         <a >Logout</a>
//       </Menu.Item>
//     </Menu>
//   )