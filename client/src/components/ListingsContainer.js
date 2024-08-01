import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <>
        <div className="divider divider-error"><h1 className="card-title">Adventures Awaiting</h1></div>
        <div className="grid gap-x-5 gap-y-10 grid-cols-4 mt-10">
        {listings.map((listing, id) => 
        <ListingCard listing={listing} key={id} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
        </div>
</>
}

export default ListingsContainer