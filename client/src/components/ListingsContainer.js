import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings}) {
    return <div>
        <h2>Adventuring Party Tavern</h2>
        {listings.map((listing) => {
            return <ListingCard listing={listing} key={listing.id} />
        })}
    </div>
}

export default ListingsContainer