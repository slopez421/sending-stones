import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";

function CommentForm({user, listing, refreshPage, setRefreshPage}) {

const commentFormSchema = yup.object().shape({
    body: yup.string().required("Comments will not post if left empty.").max(100),
});

const commentFormik = useFormik({
    initialValues: {
        body: "",
        user_id: user.id,
        listing_id: listing.id,
    },
    validationSchema : commentFormSchema,
    onSubmit: (values) => {
        commentFormik.resetForm({body: ""})
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
    ).then((res) => {
            if (res.ok) {
                setRefreshPage(!refreshPage);
            }
            });
        },
    });

    
    return <form onSubmit={commentFormik.handleSubmit}>
        <div className="card-actions">
        <div className="join">
        <input id="body" className="input input-bordered text-primary join-item" type="text" name="body" placeholder="Leave a comment!" onChange={commentFormik.handleChange} value={commentFormik.values.body}/>
        <button className="btn join-item rounded-r-full" type="submit">Post</button>
         </div>
        </div>
        <p className="text-accent-content">{commentFormik.errors.body}</p>
    </form>
   

}

export default CommentForm