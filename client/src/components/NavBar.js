import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function NavBar() {
 return (
    <nav>
        <NavLink exact to="/">Home</NavLink>
    </nav>
 )
}

export default NavBar