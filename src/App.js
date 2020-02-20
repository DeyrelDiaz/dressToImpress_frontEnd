import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './Pages/Home/Home.page';
import Register from './Components/Register/Register.component';
import NewItem from './Components/NewItem/NewItem.component';
import UserLogin from './Components/UserLogin/UserLogin.component';
import Cart from './Pages/Home/Cart.page';
import UserInfo from './Components/UserInfo/UserInfo.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/register" component={Register} />
        <Route path="/newItem" component={NewItem}/>
        <Route exact path = "/" component={UserLogin}/>
        <Route exact path = "/cart" component={Cart}/>
        <Route exact path = "/user/profile" component={UserInfo}/>
        </Switch> 
    </div>
  );
}

export default App;
