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
            <Route path='/leaderboard/DATAPK_VERSION_2_1'  element={<LeaderboardDatapkPage data='DATAPK_VERSION_2_1'  />} />
<<<<<<< HEAD
            <Route path='/leaderboard/DATAPK_ITM_VERSION_1_7'  element={<LeaderboardDatapkPage data='DATAPK_ITM_VERSION_1_7'  />} />
=======
            <Route path='/leaderboard/new_datapk800'  element={<LeaderboardDatapkPage data='new_datapk800'  />} />
>>>>>>> 5c20dd4a1a1f374e451c307c83d9e1b8ad234dec
        </Routes>
      </BrowserRouter>
    </FlagProvider>
  )
}

export default App;