import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
}, []);

return (
  <div>

  </div>
);
}

export default App;
