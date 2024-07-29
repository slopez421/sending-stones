import React from "react";
import ListingCard from "./ListingCard";
import { CardGroup } from "semantic-ui-react";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <CardGroup className="group-container">
        {listings.map((listing, id) => 
        <ListingCard listing={listing} key={id} refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
    </CardGroup>
}

export default ListingsContainer