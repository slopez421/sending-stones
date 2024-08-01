import React from "react";
import ListingCard from "./ListingCard";

function MyListingsContainer({mylistings, refreshPage, setRefreshPage, user}) {
    return <div className="grid gap-x-5 gap-y-10 grid-cols-4 ml-20 mt-10">
        <div className="justify-center">
        {mylistings.map((listing, id) => 
        <ListingCard listing={listing} key={id} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
        </div>
        </div>
}

export default MyListingsContainer