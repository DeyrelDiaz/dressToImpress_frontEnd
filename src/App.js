import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import NavBar from './Components/Navbar/Navbar.component'
import HomePage from './Pages/Home/Home.page';
import Register from './Components/Register/Register.component';
import NewItem from './Components/NewItem/NewItem.component';

function App() {
  return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/newItem" component={NewItem}/>
        </Switch>
    </div>
  );
}

export default App;
