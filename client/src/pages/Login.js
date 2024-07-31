import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

function Login({user, setUser, errors, setErrors}) {

const [showLogin, setShowLogin] = useState(true);

    return (
    <div className="grid place-content-center m-40">
        {showLogin ? (
            <>
            <LoginForm errors={errors} setErrors={setErrors} user={user} setUser={setUser} setShowLogin={setShowLogin}/>
            </>
            ): (
            <>
            <SignUpForm errors={errors} setErrors={setErrors} setShowLogin={setShowLogin} user={user} setUser={setUser}/>
            </>
            )}
    </div>)
}

export default Login