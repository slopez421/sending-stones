import React, {useEffect, useState} from "react";
import ListingsContainer from "../components/ListingsContainer";
import ListingForm from "../components/ListingForm";
import HomeMessage from "../components/HomeMessage";

function Home({likes, user, refreshPage, setRefreshPage}) {

const [listings, setListings] = useState([])

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [refreshPage]);


    return (
        <div className="grid grid-cols-4 gap-y-10 mx-20">
            <div className="col-span-1 mt-10">
            <ListingForm user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
            </div>
            <div className="col-span-3 mt-10">
            <HomeMessage listings={listings}/>
            </div>
            <div className="col-span-4">
            <ListingsContainer likes={likes} listings={listings} user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage} /> 
            </div>
    </div>
    )
}

export default Home