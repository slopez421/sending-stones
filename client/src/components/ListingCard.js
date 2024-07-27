import React from "react";
import {Card, CardContent, CardHeader, CardMeta, CardDescription} from 'semantic-ui-react'

function ListingCard({listing}) {
    const {title, body, players_have, players_needed, user_id, comments} = listing;

    return <Card className="ui card">
            <CardContent>
                <CardHeader>{title}</CardHeader>
                <CardMeta>{user_id}</CardMeta><br />
                <CardMeta>
                Has: {players_needed} players<br />
                Needs: {players_have} players
                </CardMeta>
                <CardDescription>{body}</CardDescription>
            </CardContent>
            {comments ? comments.map((comment) => <p>{comment.body}</p>) : <p></p>}
        <input type="text" name="comment" placeholder="Leave a comment!"/>
        </Card>
}

export default ListingCard