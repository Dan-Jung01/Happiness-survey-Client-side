import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Nav";
import PrivateRoute from "./components/Auth";
import Home from "./pages/index";
import Ranking from "./pages/rankings";
import Search from "./pages/search";
import Factors from "./pages/factors";
import Register from "./pages/register";
import Login from "./pages/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/rankings'>
            <Ranking />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <PrivateRoute path='/factors' component={Factors} />
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            {loggedIn ? <Redirect to='/' /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
