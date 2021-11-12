import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js"

const App = props => {
    let routes = (
        <Routes>
            <Route path="/" element={Home} />
        </Routes>
    )

    return (
        <BrowserRouter>
        {routes}
        </BrowserRouter>
    )
}

export default App;