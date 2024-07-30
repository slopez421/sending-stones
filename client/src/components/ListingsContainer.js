import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <div className="grid gap-x-2 gap-y-1 grid-cols-4" >
        {listings.map((listing, id) => 
        <ListingCard listing={listing} key={id} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
        </div>
}

export default ListingsContainer