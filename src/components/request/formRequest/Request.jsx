import React, {Component} from 'react';
import axios from 'axios';

import {Table} from 'reactstrap';


function checkLogIn(){
  fetch('http://127.0.0.1:8000/users/me', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
        });
}

export default checkLogIn
// class Newpage extends Component {
// //   constructor(props){
// //     super(props);

// //     this.state = {
// //       token: '',
// //       items: []
// //     };
// //   }

// //   async componentDidMount(){
// //     const authResponse =  
// //     fetch('http://127.0.0.1:8000/auth/register', {
// //       method: 'POST',
// //       headers: {
// //           'Content-Type': 'application/json',
// //       },
// //         email: 'user1@email.com',
// //         password: '!password!'
// //       })
// //       .then(response => {
// //       })
// //       .catch(error => {
// //       });

// //     const token = authResponse.data.access_token

// //     const articlesResponse =  
// //     fetch('http://127.0.0.1:8000/auth/register', {
// //       method: 'POST',
// //       headers: { 
// //           'Authorization': 'Cookie ' + token
// //         }
// //       }
// //     );

// //     const items = articlesResponse.data;

// //     this.setState({
// //       items,
// //       token
// //     });
// //   }

// //   render() {
// //     const {token, items} = this.state;

// //     return (
// //       <div>g
// //         {token}
// //         <Table>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Title</th>
// //               <th>Price</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {
// //               items.map(item => (
// //                 <tr key={item.id}>
// //                   <td>{item.id}</td>
// //                   <td>{item.name}</td>
// //                   <td>{item.price}</td>
// //                 </tr>
// //               ))
// //             }
// //           </tbody>
// //         </Table>
// //       </div>
// //     );
// //   }
// // }

// export default Newpage;