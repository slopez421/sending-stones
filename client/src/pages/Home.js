import React, {useEffect, useState} from "react";
import ListingsContainer from "../components/ListingsContainer";
import ListingForm from "../components/ListingForm";
import { useFormik } from "formik";
import * as yup from "yup";

function Home({user}) {

const [listings, setListings] = useState([{}])
const [refreshPage, setRefreshPage] = useState(false)

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [refreshPage]);


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
            console.log(res)
            if (res.status === 201) {
                setRefreshPage(!refreshPage);
            }
            });
        },
    });



    return (
        <div className="home">
            <ListingForm formik={listingFormik} user={user} />
            <ListingsContainer listings={listings} user={user}/>
        </div>
    )
}

export default Home