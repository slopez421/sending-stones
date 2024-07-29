import React from "react";
import CommentForm from "./CommentForm";

function ListingCard({listing, refreshPage, setRefreshPage, currentUser}) {
    const {title, body, players_have, players_needed, comments, user} = listing;
    
    return <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                    {user ? <p>{user.username}</p> : ""}
                    Has: {players_needed} players<br />
                Needs: {players_have} players
                {body}
                Comments: {comments ? comments.map((comment) => <p key={comment.id}>{comment.body}</p>) : <p></p>}
                <CommentForm user={currentUser } refreshPage={refreshPage} setRefreshPage={setRefreshPage} listing={listing}/>
      <div className="card-actions justify-end">
      </div>
    </div>
  </div>
}

export default ListingCard