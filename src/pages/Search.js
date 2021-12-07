import React, { useEffect, useState } from "react";
import { MovieCardGrid, TvCardGrid } from "../components/MovieCard";
import { useParams } from "react-router";
import { ButtonIcon } from "../components/Button";
import tmdbApi from "../services/tmdbApi";
import "./Detail/detail.scss";

const Search = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const { category, keyword } = useParams();
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getList = async () => {
            try {
                const params = {
                    query: keyword,
                };
                const response = await tmdbApi.search(category, {
                    params,
                });

                let currentIndex = response.results.length,
                    randomIndex;
                while (currentIndex !== 0) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    // And swap it with the current element.
                    [
                        response.results[currentIndex],
                        response.results[randomIndex],
                    ] = [
                        response.results[randomIndex],
                        response.results[currentIndex],
                    ];
                }

                setItems(response.results);
                setTotalPage(response.total_pages);
            } catch (error) {}
        };
        getList();
    }, [category, keyword]);

    const loadMore = async () => {
        try {
            const params = {
                page: page + 1,
                query: keyword,
            };
            const response = await tmdbApi.search(category, { params });

            let currentIndex = response.results.length,
                randomIndex;
            while (currentIndex !== 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [
                    response.results[currentIndex],
                    response.results[randomIndex],
                ] = [
                    response.results[randomIndex],
                    response.results[currentIndex],
                ];
            }

            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    return (
        <div className="container_movie">
            {category === "movie" ? (
                <div className="class_search">
                    {items.map((item, i) => (
                        <MovieCardGrid
                            key={i}
                            item={item}
                            category={category}
                        />
                    ))}
                </div>
            ) : (
                <div className="class_search">
                    {items.map((item, i) => (
                        <TvCardGrid key={i} item={item} category={category} />
                    ))}
                </div>
            )}
            {page < totalPage ? (
                <div
                    className="movie-grid__loadmore"
                    style={{ margin: "auto", marginTop: "20px" }}
                >
                    <ButtonIcon className="outline_default" onClick={loadMore}>
                        Load more
                    </ButtonIcon>
                </div>
            ) : null}
        </div>
    );
};

export default Search;
