import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Account({user, refreshPage, setRefreshPage}) {

const [isUpdating, setIsUpdating] = useState(false)

const accountSchema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    username: yup.string(),
});

const accountFormik = useFormik({
    initialValues: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.user_name,
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
        fetch("/users", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.ok) {
              setRefreshPage(!refreshPage);
            }
          });    
    }
})


    return <div className="grid place-content-center m-40">
        <div className="card-normal w-xl max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-primary-content w-96 ">
            {isUpdating ? (
            <div className="card-body">
            <h1 className="card-title">My Account</h1>
                <h3>First Name: {user.first_name}</h3>
                <h3>Last Name: {user.last_name}</h3>
                <h3>Username: {user.username}</h3><br />
                <button className="btn" onClick={() => setIsUpdating(false)}>Cancel Edits</button>
        </div> )
            : 
            (<div className="card-body">
                <h1 className="card-title">My Account</h1>
                    <h3>First Name: {user.first_name}</h3>
                    <h3>Last Name: {user.last_name}</h3>
                    <h3>Username: {user.username}</h3><br />
                    <button className="btn" onClick={() => setIsUpdating(true)}>Update Account Details</button>
            </div>)}
            
    </div>
  </div>
}

export default Account