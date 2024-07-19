import React from "react";

function ListingCard({listing}) {
    const {title, body, players_have, players_needed} = listing;

    return <div className="card">
        <h4>{title}</h4>
        <h6>{body}</h6>
        <h6>Players currently in this party: {players_have}<br />
        Currently looking for {players_needed} players.</h6>
        <button></button>
    </div>
}

export default ListingCard