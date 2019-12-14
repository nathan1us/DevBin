import React from 'react';

import NavbarComponent from './components/Navbar/Navbar';

import HomeComponent from './components/Home/Home';
import AboutComponent from './components/About/About';
import FAQComponent from './components/FAQ/FAQ';
import DashboardComponent from './components/Dashboard/Dashboard';
import AuthComponent from './components/Auth/Auth';

import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
