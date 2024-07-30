import React from "react";
import CommentForm from "./CommentForm";

function ListingCard({listing, refreshPage, setRefreshPage, currentUser}) {
    const {title, body, players_have, players_needed, comments, user} = listing;
    
    return <div className="m-3 card-compact w-full max-w-sm shrink-0 shadow-2xl rounded-box bg-primary text-primary-content w-96 ">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                    {user ? <p>{user.username}</p> : ""}
                    Has: {players_needed} players<br />
                Needs: {players_have} players
                {body}
        <CommentForm user={currentUser } refreshPage={refreshPage} setRefreshPage={setRefreshPage} listing={listing}/>
        <div className="collapse">
            <input type="checkbox" className="peer" />
                <div className="collapse-title bg-accent text-primary-content peer-checked:bg-accent peer-checked:text-secondary-content">
                <h4>Comments</h4>
            </div>
                <div className="collapse-content bg-accent text-primary-content peer-checked:bg-accent peer-checked:text-secondary-content">
                    {comments ? comments.map((comment) => <p key={comment.id}>{comment.body}</p>) : <p></p>}
                </div>
            </div>
      
    </div>
  </div>
}

export default ListingCard