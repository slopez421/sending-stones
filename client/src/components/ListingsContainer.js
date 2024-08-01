import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <div>
        <div className="divider divider-error">
            <h1 className="card-title">Adventures Awaiting</h1></div>
        <div className="flex flex-row flex-wrap-reverse flex-none mt-10">
        {listings.map((listing) => 
        <div className="basis-1/4">
        <ListingCard key={listing.id} listing={listing}  refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        </div>
        )}
        </div>
        
</div>
}

export default ListingsContainer