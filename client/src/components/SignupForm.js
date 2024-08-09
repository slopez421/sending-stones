import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function SignUpForm({setUser, setShowLogin, errors, setErrors}) {

    const navigate = useNavigate()
    const signupFormSchema = yup.object().shape({
        first_name: yup.string().required("First name is required to sign up."),
        last_name: yup.string().required("Last name is required to sign up."),
        username: yup.string().required("Username is required to sign up."),
        password: yup.string().required("Password is required to sign up."),
      });
      
      const signupForm = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
        },
      
        validationSchema : signupFormSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => {
                if (res.ok) {
                    res.json().then((user) => 
                        {   navigate("/")
                            setUser(user)
                            setErrors("")
                        }
                );
                } else {
                  res.json().then((error) => setErrors(error))
                }
                });
            },
        });

    return <div className="card bg-base-100 w-96 max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={signupForm.handleSubmit}>
        <div className="card-title justify-center">Welcome to The Tavern!</div><br />
        <label className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
        <input type="text" className="grow" placeholder="First Name" id="first_name" name="first_name" onChange={signupForm.handleChange} value={signupForm.values.first_name}/>
        </label>
        <p style={{ color: "red" }}>{signupForm.errors.first_name}</p>
        <label className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
        <input type="text" className="grow" placeholder="Last Name" id="last_name" name="last_name" onChange={signupForm.handleChange} value={signupForm.values.last_name}/>
        </label>
        <p style={{ color: "red" }}>{signupForm.errors.last_name}</p>
        <label className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
        <input type="text" className="grow" placeholder="Username" id="username" name="username" onChange={signupForm.handleChange} value={signupForm.values.username}/>
        </label>
        <p style={{ color: "red" }}>{signupForm.errors.username}</p>
        <label className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="Password" className="grow" id="password" name="password" onChange={signupForm.handleChange} value={signupForm.values.password} />
            </label>
            <p style={{ color: "red" }}> {signupForm.errors.password}</p>
            <button className="btn btn-primary" type="submit">Signup</button>
            <button className="btn btn-primary" onClick={() => {setShowLogin(true); setErrors("")}}>Login</button>
        </form>
        {errors ? <h2 className="card-body">Uh oh! {errors.error}</h2>: <></> }
    </div>
}

export default SignUpForm