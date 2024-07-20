import React, {useEffect, useState} from "react";
import ListingsContainer from "./ListingsContainer";
import ListingForm from "./ListingForm";
import { useFormik } from "formik";
import * as yup from "yup";

function Home() {

const [listings, setListings] = useState([{}])
const [refreshPage, setRefreshPage] = useState(false)

useEffect(() => {
    fetch("/listingindex")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
}, [refreshPage]);

const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title."),
    body: yup.string().required("A description is required.").max(200),
    players_needed: yup.number().positive().integer().typeError("Please enter an integer.").max(6),
    players_have: yup.number().positive().integer().typeError("Please enter an integer.").max(6),
});

const formik = useFormik({
    initialValues: {
        title: "",
        body: "",
        players_needed: 0,
        players_have: 0,
    },
    validationSchema : formSchema,
    onSubmit: (values) => {
        console.log(values)
        fetch("/listingindex", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            console.log(res)
            if (res.status == 201) {
                setRefreshPage(!refreshPage);
            }
            });
        },
    });

    return (
        <div>
            <ListingForm formik={formik}/>
            <ListingsContainer listings={listings} />
        </div>
    )
}

export default Home