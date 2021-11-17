import React from "react"
import { connect } from "react-redux"
import { signOut } from "../../../store/actions/auth";

import classes from "./Toolbar.module.scss"

const Toolbar = ({ signOut }) => {
    const handleSignOut = (e) => {
        e.preventDefault()

        signOut()
    }

    return (
        <div className={classes.toolbarOuter}>
            <div className="gridWidth">
                <div className={classes.toolbarInner}>
                    <div className={classes.brand}>Together</div>
                    <div onClick={handleSignOut} className={classes.signoutLink}>Signout</div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { signOut })(Toolbar);