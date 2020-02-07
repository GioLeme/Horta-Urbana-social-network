import React, {useEffect, useState} from 'react';
import Login from './pages/login/login'
import Feed from './pages/feed/feed';
import Profile from './pages/profile/profile';
import Signup from './pages/signup/signup';
import Header from './components/header/header'
import fire from "./config/firebase";
import './global.css'

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    setIsLoading(true)
    fire.auth().onAuthStateChanged((user) => {
      if (user) { 
        setUser(user)
      }
      setIsLoading(false)
    })
  }, []);

  function routerConfig() {
    return (
      <div>
        <BrowserRouter>
          {user ? <Header page={window.location.pathname} /> : ''}
          {
            isLoading ?
              'carregando...'
              : <Switch>
              <Route path="/login" component={user ? Feed : Login} exact />
              <Route path="/" component={user ? Feed : Login} exact />
              <Route path="/signup" component={user ? Feed : Signup} />
              <Route path="/feed" component={user ? Feed : Login } />
              <Route path="/profile" component={user ? Profile : Login } />
            </Switch>
          }
        </BrowserRouter>
      </div>
    );
  }
  return routerConfig()
}

export default App;
