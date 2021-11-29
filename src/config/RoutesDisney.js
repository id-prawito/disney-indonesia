import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail/Detail";
import Genres from "../pages/Genres";
import Search from "../pages/Search";
import List from "../pages/List";

const RoutesDisney = () => {
    return (
        <Switch>
            <Route exact path="/:category/:id" component={Detail} />
            <Route exact path="/:category/search/:keyword" component={Search} />
            <Route exact path="/:category/list/:type" component={List} />
            <Route exact path="/:category" component={Catalog} />
            <Route path="/" exact component={Home} />
            <Route
                exact
                path="/:category/genres/:id_genres"
                component={Genres}
            />
        </Switch>
    );
};

export default RoutesDisney;
