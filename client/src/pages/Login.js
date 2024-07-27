import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

function Login({user, setUser}) {

const [showLogin, setShowLogin] = useState(true);

    return (
    <div>
        {showLogin ? (
            <>
            <LoginForm user={user} setUser={setUser}/>
            <button onClick={() => setShowLogin(false)}>Don't have an account?</button>
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