import React, {useEffect, useState} from "react";
import ListingsContainer from "./ListingsContainer";

function Home() {

const [listings, setListings] = useState([])

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [])

    return (
        <div>
            <ListingsContainer listings={listings} />
        </div>
    )
}

export default Home