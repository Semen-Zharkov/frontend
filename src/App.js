import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Main from './sitePagesRouting/main';
import SignUp from './sitePagesRouting/signUp';
import LogIn from './sitePagesRouting/logIn';
import RequestTest from './sitePagesRouting/requestTest';
import UploadFile from './sitePagesRouting/uploadFile';
import RequestAnwserQuestions from './sitePagesRouting/requestAnswerQuestion';
import PersonArea from './sitePagesRouting/personArea';
import {PrivateRoute} from './scripts/PrivateRoute';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main /> } />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/request_test" element={<RequestTest />} />
          <Route path="/request_answer_questions" element={<RequestAnwserQuestions />} />
          <Route element={<PrivateRoute />} >
            <Route path="/upload_file" element={<UploadFile />} />
            <Route path="/person_account" element={<PersonArea />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;