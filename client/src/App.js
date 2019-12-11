import React from 'react';

import NavbarComponent from './components/Navbar/Navbar';

import HomeComponent from './components/Home/Home';
import AboutComponent from './components/About/About';
import FAQComponent from './components/FAQ/FAQ';
import DashboardComponent from './components/Dashboard/Dashboard';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
