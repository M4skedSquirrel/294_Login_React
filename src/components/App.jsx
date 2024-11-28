
import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Planning from '../components/Planning';
import Login from '../components/Login';
import Menu from '../components/Menu';
import Portfolio from '../components/Portfolio';
import "bulma/css/bulma.min.css";
import { useState } from 'react';

function App() {
  
  const getUserFromSession = () => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const [user, setUser] = useState(getUserFromSession());
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data);
    sessionStorage.setItem('user', JSON.stringify(data));
  };

  return (
    <BrowserRouter>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        <Menu />
        <div>
          <Routes>
            <Route 
            path="/" 
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/planning" />
            } />
            <Route 
              path="/planning" 
              element={isLoggedIn ? <Planning userData={user} /> : <Navigate to="/planning" />} 
            />
            <Route 
              path="/portfolio" 
              element={isLoggedIn ? <Portfolio /> : <Navigate to="/portfolio" />} 
          />
        </Routes>
        </div>
      </div>
    </BrowserRouter>

  );

}

export default App;
