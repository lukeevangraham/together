import React from "react"
import Auth from "./Auth/Auth"
import Pitch from "./Pitch/Pitch"

import classes from "./Home.module.scss"

const Home = (
    <div className={classes.main}>
        <Pitch />
        <Auth />
    </div>
)

export default Home;