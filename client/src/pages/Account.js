import React from "react";

function Account({user}) {

    return <div><div className="card-compact w-full max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-primary-content w-96 ">
            <div className="card-body">
                <h2 className="card-title">My Account</h2>
                    <h3>First Name: {user.first_name}</h3>
                    <h3>Last Name: {user.last_name}</h3>
                    <h3>Username: {user.username}</h3>
            </div>
            
    </div>
  </div>
}

export default Account