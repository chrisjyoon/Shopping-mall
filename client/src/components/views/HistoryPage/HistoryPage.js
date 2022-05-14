import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Auth from '../../../hoc/auth';

function HistoryPage(props) {
//   const {history, setHistory} = useState([]);
  props.user.userData && props.user.userData.history 
  && props.user.userData.history.map(item => {
      console.log(item.id);
  })
//   useEffect(() => {
//     axios.get('/api/users/history')
//         .then(response => {
//             if (response.data.success) {
//                 console.log('###history:',response.data.history);
//                 setHistory(response.data.history);
//                 console.log('@@@sethistory:',history && history);
//             } else {
//                 alert('failed to get historhy information');
//             }
//         })
//   },[])

//   console.log('#### userData: ',response.data.history);
  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
          <h1>History</h1>
      </div>
      <br />

      <table>
          <thead>
              <tr>
                  <th>Payment Id</th>
                  <th>Price</th>
                  <th>Quantity</th> 
                  <th>Date of Purchase</th>
              </tr>
          </thead>

          <tbody> 

              {props.user.userData && props.user.userData.history &&  
                  props.user.userData.history[0].map((item,index) => { return (
                //   {history && history.map(item => (
                      <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.dateOfPurchase}</td>
                      </tr>
                  )})}
          </tbody>
      </table>
    </div>
  )
}

export default Auth(HistoryPage,true);
