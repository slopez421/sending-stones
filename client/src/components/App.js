import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyListings from "../pages/MyListings";
import Account from "../pages/Account";


function App() {
const [user, setUser] = useState(null)
const [refreshPage, setRefreshPage] = useState(false)
const [errors, setErrors] = useState("")
const [accountUpdated, setAccountUpdated] = useState(false)

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    });
  }, []);
  
  if (!user) return <Login user={user} setUser={setUser} errors={errors} setErrors={setErrors}/>

  return <div data-theme="autumn">
    <div >
    <NavBar setUser={setUser}/>
    <Routes>
      <Route path="/" element={<Home refreshPage={refreshPage} setRefreshPage={setRefreshPage} user={user}/>}>
      </Route>
      <Route path="/mylistings" element={<MyListings refreshPage={refreshPage} setRefreshPage={setRefreshPage} user={user}/>}>
      </Route>
      <Route path="/myaccount" element={<Account accountUpdated={accountUpdated} setAccountUpdated={setAccountUpdated} setUser={setUser} user={user}/>}>
      </Route>
      </Routes>
    </div>
  </div>
}

export default App;
