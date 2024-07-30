import React, {useEffect, useState} from "react";
import ListingsContainer from "../components/ListingsContainer";
import ListingForm from "../components/ListingForm";

function Home({user}) {

const [listings, setListings] = useState([{}])
const [refreshPage, setRefreshPage] = useState(false)

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [refreshPage]);


    return (
        <div className="container mx-auto">
            <ListingForm user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
            <div className="divider-horizontal"></div>
            <ListingsContainer listings={listings} user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
                
    </div>
    )
}

export default Home