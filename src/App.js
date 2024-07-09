import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Main from './sitePagesRouting/main';
import SignUp from './sitePagesRouting/signUp';
import LogIn from './sitePagesRouting/logIn';
import RequestDocumentation from './sitePagesRouting/requestDocumentation';
import UploadFile from './sitePagesRouting/uploadFile';
import PersonArea from './sitePagesRouting/personArea';
import {PrivateRouteUnauthorized} from './scripts/PrivateRouteUnauthorized';
import { PrivateRouteAuthorized } from './scripts/PrivateRouteAuthorized';
import FormForgotPassword from './sitePagesRouting/forgotPassword';
import FormResetPassword from './sitePagesRouting/resetPassword';
import WorkDocumentation from './sitePagesRouting/WorkDocumentation'
import { FlagProvider } from './flagContext';
import LeaderboardDatapkPage from './sitePagesRouting/leaderboardDatapk';
import LeaderboardDatapkitmPage from './sitePagesRouting/leaderboardDatapkitm';

function App() {  
  return (
    <FlagProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main /> } />
            <Route path="/request_documentation" element={<RequestDocumentation />} />
            <Route path="/work_documentation" element={<WorkDocumentation />} />
            <Route path="/forgot_password" element={<FormForgotPassword/>} />
            <Route path="/reset_password" element={<FormResetPassword/>} />
            <Route element={<PrivateRouteUnauthorized />} >
              <Route path="/upload_file" element={<UploadFile />} />
              <Route path="/person_account" element={<PersonArea />} />
            </Route>
            <Route element={<PrivateRouteAuthorized />}>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/logIn" element={<LogIn />} />
            </Route>
            <Route path='/leaderboard/datapk-itm'  element={<LeaderboardDatapkPage data='datapk-itm'  />} />
            <Route path='/leaderboard/datapk'  element={<LeaderboardDatapkPage data='datapk'  />} />
        </Routes>
      </BrowserRouter>
    </FlagProvider>
  )
}

export default App;