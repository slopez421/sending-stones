import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Button } from "semantic-ui-react";

function NavBar({setUser}) {

function handleLogout() {
    fetch("/logout", {
        method: "DELETE"}).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }

 return (
    <nav>
        <NavLink exact to="/">Home</NavLink>
        <Button onClick={handleLogout}>Logout</Button>
    </nav>
 )
}

export default NavBar