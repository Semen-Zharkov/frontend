import React, { useState } from 'react';
import Header from '../components/main/header/Header';
import Requests from '../components/requestTest/formRequest/RequestTest'
import Fitback from '../components/userComments/UserComments'
import SeachForDocumentation from '../components/seachForDocumentation/SeachForDocumentation'

const Request = () => {
    return (
        <div>
            <Header />
            <Requests />
            
        </div>
    );
}

export default Request ;