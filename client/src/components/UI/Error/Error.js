import React from "react";

import classes from "./Error.module.scss";

const Error = ({ message }) => <div className={classes.error}>{message}</div>;

export default Error;
