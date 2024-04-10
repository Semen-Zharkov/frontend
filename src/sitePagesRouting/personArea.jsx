import React, { useState } from 'react';
import Header from '../components/main/header/Header';
import InformationUser from '../components/personArea/mainPersonArea/InformationUser.jsx';
import SeachForDocumentation from '../components/seachForDocumentation/SeachForDocumentation'

const PersonArea = () => {
    return (
        <div>
            <Header />
            <InformationUser/>
        </div>
    );
}

export default PersonArea;