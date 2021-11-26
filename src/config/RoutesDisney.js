import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail/Detail";
import Genres from "../pages/Genres";

const RoutesDisney = () => {
    return (
        <Switch>
            <Route path="/:category/:id" component={Detail} />
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category" component={Catalog} />
            <Route path="/" exact component={Home} />
            <Route exact path="/genres/genres" component={Genres} />
        </Switch>
    );
};

export default RoutesDisney;
