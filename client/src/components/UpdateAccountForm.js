import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function UpdateAccountForm({setUser, setIsUpdating, setAccountUpdated, errors, setErrors}) {

    const accountSchema = yup.object().shape({
        first_name: yup.string().required("If there are no changes to your first name, leave first name in place."),
        last_name: yup.string().required("If there are no changes to your last name, leave your last name in place."),
        username: yup.string().required("If there are no changes to your username, leave the current username in place."),
    });
    
    const accountFormik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
        },
        
        validationSchema: accountSchema,
        onSubmit: (values) => {
            fetch("/updateuser", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
              }).then((res) => {
                if (res.status === 201) {
                    res.json().then((updatedUser) => {setUser(updatedUser)})
                  setAccountUpdated(true);
                  setIsUpdating(false);
                } else {
                  res.json().then((error) => setErrors(error))
                }
              });    
        }
    })

    return <form className="card-body text-primary"  onSubmit={accountFormik.handleSubmit}>
        <h1 className="card-title text-neutral-content justify-center">My Account</h1><br />
        <span className="label-text-alt text-neutral-content">{accountFormik.errors.first_name}</span>
            <label className="input input-bordered flex items-center gap-2 text-secondary-content">First Name: 
            <input id="first_name" type="text" className="grow" placeholder="" name="first_name" onChange={accountFormik.handleChange} value={accountFormik.values.first_name} />
            </label>
            <span className="label-text-alt text-neutral-content">{accountFormik.errors.last_name}</span>
            <label className="input input-bordered flex items-center gap-2 text-secondary-content">Last Name: 
            <input id="last_name" type="text" className="grow" placeholder="" name="last_name" onChange={accountFormik.handleChange} value={accountFormik.values.last_name} />
            </label>
            <span className="label-text-alt text-neutral-content">{accountFormik.errors.username}</span>
            <label className="input input-bordered flex items-center gap-2 text-secondary-content">Username: 
            <input id="username" type="text" className="grow" placeholder="" name="username" onChange={accountFormik.handleChange} value={accountFormik.values.username} />
            </label>
            <button className="btn" type="submit">Update Account</button>
            <button className="btn" onClick={() => setIsUpdating(false)}>Cancel</button>
            {errors ? <h2 className="card-body text-neutral-content">Uh oh! {errors.error}</h2>: <></> }
        </form>
}

export default UpdateAccountForm