import React from "react";
import ListingCard from "./ListingCard";

function MyListingsContainer({mylistings, refreshPage, setRefreshPage, user, likes}) {
    return <>
     <div className="divider divider-error mx-20 mt-10"><h1 className="card-title">Your Adventures Awaiting</h1></div>
     <div className="grid gap-x-5 gap-y-10 grid-cols-4 mx-20 mt-10">
        {mylistings.map((listing, id) => 
        <ListingCard key={id} likes={likes} listing={listing} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
        </div>
    </>
}

export default MyListingsContainer