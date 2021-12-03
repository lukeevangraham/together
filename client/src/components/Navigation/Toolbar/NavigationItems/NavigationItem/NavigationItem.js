import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.scss";

const navigationItem = ({ link, children }) => (
  <li>
    <NavLink to={link} exact="true" activeclassname={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
