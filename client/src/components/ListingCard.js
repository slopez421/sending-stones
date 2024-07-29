import React from "react";
import {Card, CardContent, CardHeader, CardMeta, CardDescription} from 'semantic-ui-react'
import CommentForm from "./CommentForm";

function ListingCard({listing, refreshPage, setRefreshPage, currentUser}) {
    const {title, body, players_have, players_needed, comments, user} = listing;
    
    return <Card className="ui card">
            <CardContent>
                <CardHeader>{title}</CardHeader>
                <CardMeta>{user ? <p>{user.username}</p> : ""}</CardMeta><br />
                <CardMeta>
                Has: {players_needed} players<br />
                Needs: {players_have} players
                </CardMeta>
                <CardDescription>{body}</CardDescription>
            </CardContent>
            <CardContent extra>Comments: {comments ? comments.map((comment) => <p key={comment.id}>{comment.body}</p>) : <p></p>}
            <CommentForm user={currentUser } refreshPage={refreshPage} setRefreshPage={setRefreshPage} listing={listing}/>
            </CardContent>
        </Card>
}

export default ListingCard