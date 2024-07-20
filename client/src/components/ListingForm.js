import React, {useState} from "react";

function ListingForm({formik}) {



    return <div>
        <h1>Post a Listing</h1>
        <form onSubmit={formik.handleSubmit} >
            <label>Title: </label>
            <input id="title" name="title" onChange={formik.handleChange} value={formik.values.title} /><br />
            <p style={{ color: "red" }}> {formik.errors.title}</p>
            <label>Description: </label>
            <input id="body" name="body" onChange={formik.handleChange} value={formik.values.body} /><br />
            <p style={{ color: "red" }}> {formik.errors.body}</p>
            <label>Players Needed: </label>
            <input id="players_needed" name="players_needed" onChange={formik.handleChange} value={formik.values.players_needed} /><br />
            <p style={{ color: "red" }}> {formik.errors.players_needed}</p>
            <label>Players Have: </label>
            <input id="players_have" name="players_have" onChange={formik.handleChange} value={formik.values.players_have} /><br />
            <p style={{ color: "red" }}> {formik.errors.players_have}</p>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default ListingForm