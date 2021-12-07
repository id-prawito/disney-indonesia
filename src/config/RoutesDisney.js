import { Route, Switch } from "react-router-dom";
import React from "react";
import CastDetail from "../pages/Cast/CastDetail";
import Detail from "../pages/Detail/Detail";
import Catalog from "../pages/Catalog";
import Genres from "../pages/Genres";
import Search from "../pages/Search";
import Home from "../pages/Home";
import List from "../pages/List";
import Card from "../pages/Card";

const RoutesDisney = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:category/search/:keyword" component={Search} />
            <Route exact path="/:category/person/:id" component={CastDetail} />
            <Route exact path="/:category/list/:type" component={List} />
            <Route exact path="/channels/card/:judul" component={Card} />
            <Route exact path="/:category/:id" component={Detail} />
            <Route exact path="/:category" component={Catalog} />
            <Route
                exact
                path="/:category/genres/:id_genres"
                component={Genres}
            />
        </Switch>
    );
};

export default RoutesDisney;
