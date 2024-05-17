import React from 'react';
import { FlagProvider } from '../flagContext';
import RequestDocumentation from '../components/requestDocumentation/RequestDocumentation';

const Request = () => {
  return (
    <FlagProvider>
      
        <RequestDocumentation />
    </FlagProvider>
  );
};

export default Request;