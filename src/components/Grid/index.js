import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import "./movie-grid.scss";

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(
                            movieType.upcoming,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
        };
        getList();
    }, [props.category, keyword]);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {items.map((item, i) => (
                    <MovieCard category={props.category} item={item} key={i} />
                ))}
            </div>
        </>
    );
};

export default MovieGrid;
