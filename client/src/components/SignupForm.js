import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";

function SignUpForm({user, setUser}) {

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
        <form onSubmit={signupForm.handleSubmit}>
            <label>First Name: </label>
            <input id="first_name" name="first_name" onChange={signupForm.handleChange} value={signupForm.values.first_name} />
            <p style={{ color: "red" }}> {signupForm.errors.first_name}</p>
            <label>Last Name:</label>
            <input id="last_name" name="last_name" onChange={signupForm.handleChange} value={signupForm.values.last_name} />
            <p style={{ color: "red" }}> {signupForm.errors.last_name}</p>
            <label>Username: </label>
            <input id="username" name="username" onChange={signupForm.handleChange} value={signupForm.values.username} />
            <p style={{ color: "red" }}> {signupForm.errors.username}</p>
            <label>Password:</label>
            <input id="password" name="password" onChange={signupForm.handleChange} value={signupForm.values.password} />
            <p style={{ color: "red" }}> {signupForm.errors.password}</p>
            <button type="submit">Signup</button>
        </form>
    </div>
}

export default SignUpForm