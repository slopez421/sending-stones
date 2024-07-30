import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";

function LoginForm({user, setUser}) {

    const loginFormSchema = yup.object().shape({
        username: yup.string().required("Username is required to login."),
        password: yup.string().required("Password is required to login."),
      });
      
      const loginFormik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
      
        validationSchema : loginFormSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    res.json().then((user) => setUser(user));
                    console.log(user)
                } else {
                  res.json().then((error) => console.log(error))
                }
                });
            },
        });
    
    return <div>
        <form onSubmit={loginFormik.handleSubmit}>
            <label>Username: </label>
            <input id="username" name="username" onChange={loginFormik.handleChange} value={loginFormik.values.username} />
            <p style={{ color: "red" }}> {loginFormik.errors.username}</p>
            <label>Password:</label>
            <input id="password" type="password" name="password" onChange={loginFormik.handleChange} value={loginFormik.values.password} />
            <p style={{ color: "red" }}> {loginFormik.errors.password}</p>
            <button type="submit">Login</button>
        </form>
    </div>
}

export default LoginForm