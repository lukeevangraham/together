import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/auth";
import NavigationItems from "./NavigationItems/NavigationItems";
import { NavLink, Link } from "react-router-dom";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ signOut, user }) => {
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut();
  };

  return (
    <div className={classes.toolbarOuter}>
      <div className="gridWidth">
        <div className={classes.toolbarInner}>
          <div className={classes.brand}>
            <Link to="/" exact="true">
              Together
            </Link>
          </div>
          {/* <NavigationItems /> */}
          <div onClick={handleSignOut} className={classes.signoutLink}>
            Signout
          </div>
          {user.firstName ? (
            <NavLink to={"profile"} exact="true" className={classes.userButton}>
              <div>{user.firstName[0]}</div>
              <div>{user.firstName}</div>
            </NavLink>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.auth });

export default connect(mapStateToProps, { signOut })(Toolbar);
