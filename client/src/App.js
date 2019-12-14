import React, { createContext, useEffect, useState } from 'react';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';


import AboutComponent from './components/About/About';
import AuthComponent from './components/Auth/Auth';
import DashboardComponent from './components/Dashboard/Dashboard';
import FAQComponent from './components/FAQ/FAQ';
import HomeComponent from './components/Home/Home';
import NavbarComponent from './components/Navbar/Navbar';

import AuthService from './services/Auth';

export const AuthContext = createContext({ pastes: [], authLevel: 0, isLogged: false, username: '' });

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [authLevel ,setAuthLevel] = useState(0);
  const [username, setUsername] = useState('');
  const [pastes, setPastes] = useState([]);
  const [joined, setJoined] = useState('');

  useEffect(() => {
    AuthService.auth()
      .then(user => {
        if (user.hasOwnProperty('username')) {
          setIsLogged(true);
          setAuthLevel(user.authLevel);
          setUsername(user.username);
          setPastes(user.pastes);
          setJoined(user.joined);
        }
      });
  })

  return (
    <AuthContext.Provider value={{ joined, setJoined, pastes, setPastes, authLevel, setAuthLevel, isLogged, setIsLogged, username, setUsername }}>
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/faq" component={FAQComponent} />
          <Route path="/dashboard" component={DashboardComponent} />

          <Route path="/login" component={AuthComponent} />
          <Route path="/register" component={AuthComponent} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
