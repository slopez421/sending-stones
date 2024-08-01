import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, refreshPage, setRefreshPage, user}) {
    return <div>
        <div className="divider divider-error"><h1 className="card-title">Adventures Awaiting</h1></div>
        <div className="grid gap-x-5 gap-y-10 grid-cols-4 mt-10">
        {listings.map((listing) => <ListingCard key={listing.id} listing={listing}  refreshPage={refreshPage} setRefreshPage={setRefreshPage} currentUser={user}/>
        )}
        </div>
</div>
}

export default ListingsContainer