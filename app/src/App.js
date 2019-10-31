import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ItsBedtime from './components/ItsBedtime.js';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Register from './components/Register.js'

function App() {
  return (
      <div>
          <Home/>
      </div>
  );
}
export default App;