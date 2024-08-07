import React, { useState } from "react";
import CommentForm from "./CommentForm";

function ListingCard({listing, refreshPage, setRefreshPage, currentUser}) {
    const {title, body, players_have, players_needed, comments, user} = listing;
    const [color, setColor] = useState("none")

    function handleClick() {
        setColor("red")
    }
    
    return <div className="card-compact w-xl max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-neutral-content w-96 ml mt-10">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                    <h3>Posted By: {user ? <p>{user.username}</p> : ""}</h3>
                    <h3>This adventuring party has {players_have} players and is seeking {players_needed} more players.</h3>
                <p>{body}</p>
        
        <div className="card-actions">
                <button className="btn" onClick={() => handleClick()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill={color}
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                <CommentForm user={currentUser} refreshPage={refreshPage} setRefreshPage={setRefreshPage} listing_id={listing.id} listing={listing}/>
                </div>
        <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
                <div className="collapse-title bg-neutral-content text-primary peer-checked:bg-neutral-content peer-checked:text-primary">
                <p className="card-title">Comments</p>
            </div>
                <div className="collapse-content bg-neutral-content text-primary-content peer-checked:bg-neutral-content peer-checked:text-secondary-content">
                    {comments.length > 0 ? comments.map((comment) =>
                        <div key={comment.id} className="chat chat-end"><div className="chat-bubble" key={comment.id}>{comment.body}</div></div>) : <p>Be the first to comment!</p>}
                </div>
            </div>
    </div>
  </div>
}

export default ListingCard