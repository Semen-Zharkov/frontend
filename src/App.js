import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Header from './components/main/header/Header'
import Test from './components/test/formTest/Test'
import Request from './components/request/formRequest/Request'

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
}, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Header/> } />
          <Route path="test" element={<Test />} />
          <Route path="request" element={<Request />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
