import React from "react";
import ListingCard from "./ListingCard";
import { CardGroup } from "semantic-ui-react";

function ListingsContainer({listings}) {
    return <CardGroup className="group-container">
        {listings.map((listing) => {
            return <>
            <ListingCard listing={listing} key={listing.id}/>
            </>
        })}
    </CardGroup>
}

export default ListingsContainer