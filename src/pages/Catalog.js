import React, { useCallback, useEffect, useState } from "react";
import { ListMovie, ListTV } from "../components/ListCard";
import { category as cate } from "../services/tmdbApi";
import { useHistory, useParams } from "react-router";
import { ButtonIcon } from "../components/Button";
import Input from "../components/Input";
import Hero from "../components/Hero";
import Watchlist from "./Watchlist";
import "./Detail/detail.scss";

const Catalog = () => {
    const { category } = useParams();

    return (
        <>
            {category === cate.movie ? (
                <MovieGrid />
            ) : category === cate.tv ? (
                <TvGrid />
            ) : category === "original" ? (
                <Original />
            ) : category === "watchlist" ? (
                <WatchlistList />
            ) : null}
        </>
    );
};

const MovieGrid = () => {
    const { keyword, category } = useParams();

    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.movie}
            />
            <div className="container_movie">
                <MovieSearch category={category} keyword={keyword} />
                <ListMovie />
            </div>
        </>
    );
};

const TvGrid = () => {
    const { keyword, category } = useParams();

    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.tv}
            />
            <div className="container_movie">
                <MovieSearch category={category} keyword={keyword} />
                <ListTV />
            </div>
        </>
    );
};

const MovieSearch = (props) => {
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
    const history = useHistory();
    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push(`/${cate[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener("keyup", enterEvent);
        return () => {
            document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <ButtonIcon className="icon" onClick={goToSearch}>
                Search
            </ButtonIcon>
        </div>
    );
};

const Original = () => {
    return (
        <div>
            <h1>Hallo Original</h1>
        </div>
    );
};

const WatchlistList = () => {
    return <Watchlist />;
};

export default Catalog;
