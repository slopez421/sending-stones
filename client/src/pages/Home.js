import React, {useEffect, useState} from "react";
import ListingsContainer from "../components/ListingsContainer";
import ListingForm from "../components/ListingForm";

function Home({user, refreshPage, setRefreshPage}) {

const [listings, setListings] = useState([])

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [refreshPage]);


    return (
        <div >
            <div className="mx-20" >
            <ListingForm user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
            </div>
            <ListingsContainer listings={listings} user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage} /> 
    </div>
    )
}

export default Home