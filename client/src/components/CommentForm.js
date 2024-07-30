import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function CommentForm({user, listing, refreshPage, setRefreshPage}) {

const commentFormSchema = yup.object().shape({
    body: yup.string().max(100),
});

const commentFormik = useFormik({
    initialValues: {
        body: "",
        user_id: user.id,
        listing_id: listing.id,
    },
    validationSchema : commentFormSchema,
    onSubmit: (values) => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            console.log(res)
            if (res.ok) {
                setRefreshPage(!refreshPage);
            }
            });
        },
    });

    
    return <form onSubmit={commentFormik.handleSubmit}>
        <div className="card-actions">
        <input id="body" className="input input-bordered input-sm w-full max-w-xs" type="text" name="body" placeholder="Leave a comment!" onChange={commentFormik.handleChange}/>
        <button className="btn" type="submit">Post</button>
        <p className="input-error">{commentFormik.errors.body}</p>
        </div>
    </form>

}

export default CommentForm