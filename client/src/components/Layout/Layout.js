import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => (
    <>
    <Toolbar />
    {props.children}
    </>
)

export default Layout;