import React, { useState } from "react";
import UpdateAccountForm from "../components/UpdateAccountForm";


function Account({user, setUser, accountUpdated, setAccountUpdated, errors, setErrors}) {

const [isUpdating, setIsUpdating] = useState(false)

    return <div className="grid place-content-center mt-20">
        <div className="card-normal max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-primary-content w-96 ">
            {isUpdating ? (
            <UpdateAccountForm errors={errors} setErrors={setErrors} accountUpdated={accountUpdated} setAccountUpdated={setAccountUpdated} user={user} setUser={setUser} setIsUpdating={setIsUpdating}/>
             )
            : 
            <div className="card-body">
            <h1 className="card-title justify-center">My Account</h1>
                <h3>First Name: {user.first_name}</h3>
                <h3>Last Name: {user.last_name}</h3>
                <h3>Username: {user.username}</h3><br />
                <button className="btn" onClick={() => setIsUpdating(true)}>Edit Account</button>
            </div>
            }
    </div>
</div>
}


export default Account