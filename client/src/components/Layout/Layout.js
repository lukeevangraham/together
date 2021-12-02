import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.scss";

const Layout = (props) => (
  <>
    <Toolbar />
    <div className={classes.main}>{props.children}</div>
  </>
);

export default Layout;
