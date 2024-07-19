import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";

function App() {
  return <div>
    <BrowserRouter>
    <NavBar />
    <Switch>
      <Route path ="/">
        <Home />
      </Route>
    </Switch>
    </BrowserRouter>
  </div>
}

export default App;
