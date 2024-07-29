import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <div>
        {listings.map((listing, id) => 
        <ListingCard listing={listing} key={id} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
</div>
}

export default ListingsContainer