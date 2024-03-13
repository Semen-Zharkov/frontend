import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Main from './sitePagesRouting/main'
import SignUp from './sitePagesRouting/signUp'
import LogIn from './sitePagesRouting/logIn'
import Request from './sitePagesRouting/request'
// import Header from './components/main/header/Header'
// import Test from './components/test/formTest/scriptCreateTest'
// import Request from './components/request/formRequest/Request'
// import form from './components/registration/formSignUp/SignUp'

function App() {
//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     axios
//     .get('http://127.0.0.1:8000')
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));
// }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main /> } />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="request" element={<Request />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
