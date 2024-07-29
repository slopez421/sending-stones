import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ListingForm({refreshPage, setRefreshPage, user}) {

const listingFormSchema = yup.object().shape({
    title: yup.string().required("Must enter a title."),
    body: yup.string().required("A description is required.").max(200),
    players_needed: yup.number().positive().integer().typeError("Please enter an integer.").max(6),
    players_have: yup.number().positive().integer().typeError("Please enter an integer.").max(6),
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

    
    return <div className="form">
        <form onSubmit={listingFormik.handleSubmit}>
            <label>Title: </label>
            <input id="title" name="title" onChange={listingFormik.handleChange} value={listingFormik.values.title} />
            <p style={{ color: "red" }}> {listingFormik.errors.title}</p>
            <label>Description: </label>
            <input id="body" name="body" onChange={listingFormik.handleChange} value={listingFormik.values.body} />
            <p style={{ color: "red" }}> {listingFormik.errors.body}</p>
            <label>Players Needed: </label>
            <input id="players_needed" name="players_needed" onChange={listingFormik.handleChange} value={listingFormik.values.players_needed} />
            <p style={{ color: "red" }}> {listingFormik.errors.players_needed}</p>
            <label>Players Have: </label>
            <input id="players_have" name="players_have" onChange={listingFormik.handleChange} value={listingFormik.values.players_have} />
            <p style={{ color: "red" }}> {listingFormik.errors.players_have}</p>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default ListingForm