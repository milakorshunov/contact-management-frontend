import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import ContactManagemen from './ContactManagement';


function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      {token ? <ContactManagemen token={token} /> : <Login setToken={setToken} />}
    </div>
  );

}

export default App;
