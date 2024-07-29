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
        <div>
            <ListingForm user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
            <ListingsContainer listings={listings} user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
        </div>
    )
}

export default Home