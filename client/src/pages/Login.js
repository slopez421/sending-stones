import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

function Login({user, setUser}) {

const [showLogin, setShowLogin] = useState(true);

    return (
    <div className="grid place-content-center m-40">
        {showLogin ? (
            <>
            <LoginForm user={user} setUser={setUser} setShowLogin={setShowLogin}/>
            </>
            ): (
            <>
            <SignUpForm user={user} setUser={setUser}/>
            <button onClick={() => setShowLogin(true)}>Login</button>
            </>
            )}
    </div>)
}

export default Login