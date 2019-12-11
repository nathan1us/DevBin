import React from 'react';

import HomeComponent from './components/Home/Home';
import AboutComponent from './components/About/About';
import NavbarComponent from './components/Navbar/Navbar';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
