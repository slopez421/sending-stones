import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";


function App() {
const [user, setUser] = useState(null)


  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    });
  }, []);
  
  if (!user) return <Login user={user} setUser={setUser} />

  return <div data-theme="autumn">
    <BrowserRouter>
    <NavBar setUser={setUser}/>
    <Switch>
      <Route path ="/">
        <Home user={user}/>
      </Route>
    </Switch>
    </BrowserRouter>
  </div>
}

export default App;
