import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ListingForm({refreshPage, setRefreshPage, user}) {

const listingFormSchema = yup.object().shape({
    title: yup.string().required("Adventuring posts need a title!"),
    body: yup.string().required("A description is required.").max(200),
    players_needed: yup.number().positive().integer().typeError("Please enter a number.").max(6),
    players_have: yup.number().positive().integer().typeError("Please enter a number").max(6),
});

const listingFormik = useFormik({
    initialValues: {
        title: "",
        body: "",
        players_needed: 0,
        players_have: 0,
        user_id: user.id,
    },
    validationSchema : listingFormSchema,
    onSubmit: (values) => {
        fetch("/listingindex", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            if (res.status === 201) {
                setRefreshPage(!refreshPage);
            }
            });
        },
    });

    
    return <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={listingFormik.handleSubmit}>
        <h1 className="card-title justify-center">Adventuring Board</h1><br />
            <label className="input input-bordered flex items-center gap-2">Title
            <input id="title" type="text" className="grow" placeholder="Title your post" name="title" onChange={listingFormik.handleChange} value={listingFormik.values.title} />
            </label>
            <p style={{ color: "red" }}> {listingFormik.errors.title}</p>
            <label className="input input-bordered flex items-center gap-2">Description
            <input id="body" type="text" className="grow" placeholder="Describe your campaign!" name="body" onChange={listingFormik.handleChange} value={listingFormik.values.body} />
            </label>
            <p style={{ color: "red" }}> {listingFormik.errors.body}</p>
            <span className="label-text-alt">How many players are in your party?</span>
            <label className="input input-bordered flex items-center gap-2">
            <input id="players_needed" type="text" className="grow" name="players_needed" onChange={listingFormik.handleChange} value={listingFormik.values.players_needed} />
            </label>
            <p style={{ color: "red" }}> {listingFormik.errors.players_needed}</p>
            <span className="label-text-alt">How many players are you seeking to join your party?</span>
            <label className="input input-bordered flex items-center gap-2">
            <input id="players_have" name="players_have" onChange={listingFormik.handleChange} value={listingFormik.values.players_have} />
            </label>
            <p style={{ color: "red" }}> {listingFormik.errors.players_have}</p>
            <button className="btn" type="submit">Submit</button>
        </form>
    </div>
}

export default ListingForm