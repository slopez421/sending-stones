import React, { useEffect, useState } from "react";
import MyListingsContainer from "../components/MyListingsContainer";

function MyListings({user, refreshPage, setRefreshPage}) {

const [myListings, setMyListings] = useState([])

useEffect(() => {
    fetch("/mylistings")
    .then((r) => r.json())
    .then((myListings) => setMyListings(myListings))
}, [refreshPage]);


    return <div>
        <div className="flex justify-center mt-20">
        <div className="card-compact mx-20 w-full max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-primary-content w-96 ">
            <div className="card-body">
            <center><h2 className="card-title">
            Welcome {user.first_name}! <br /><br />
            Here are all of your adventures waiting to happen.
            </h2>
            </center>
            </div>
        </div>
        <div>
        </div>
        </div>
        <MyListingsContainer mylistings={myListings} refreshPage={refreshPage}setRefreshPage={setRefreshPage} user={user} />
    </div>
}

export default MyListings;