import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/auth";
// import NavigationItems from "./NavigationItems/NavigationItems";"
import { NavLink, Link, useNavigate } from "react-router-dom";

import classes from "./Toolbar.module.scss";
import InitialProfileImage from "../../UI/InitalProfileImage/InitialProfileImage";

const Toolbar = ({ signOut, user }) => {
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut();
  };

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();

    const term = e.target[0].value;

    // Clear out the input
    e.target[0].value = "";

    // Unfocus the input
    document.activeElement.blur();

    navigate(`/search/${term}`);
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

          <form onSubmit={onSearchSubmit} className={classes.search}>
            <input type="text" placeholder="Find someone" />
          </form>

          {/* <NavigationItems /> */}
          <div className={classes.navItems}>
            <div onClick={handleSignOut} className={classes.signoutLink}>
              Signout
            </div>
            {user.firstName ? (
              <NavLink
                to={"profile"}
                exact="true"
                className={classes.userButton}
              >
                {user.image ? (
                  <img
                  className={classes.profileImage}
                    src={user.image.image}
                    srcSet={`${user.image.image.replace(
                      "upload/",
                      "upload/w_30/"
                    )} 30w, ${user.image.image.replace(
                      "upload/",
                      "upload/w_50/"
                    )} 50w, ${user.image.image.replace(
                      "upload/",
                      "upload/w_100/"
                    )} 100w, ${user.image.image.replace(
                      "upload/",
                      "upload/w_150/"
                    )} 150w`}
                    sizes="(max-width: 1200px) 30px, 50px"
                    alt=""
                  />
                ) : (
                  <InitialProfileImage user={user} size={30} />
                )}

                <div>{user.firstName}</div>
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.auth });

export default connect(mapStateToProps, { signOut })(Toolbar);
