import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ButtonIcon } from "../components/Button";
import { MovieCardGrid, TvCardGrid } from "../components/MovieCard";
import tmdbApi from "../services/tmdbApi";
import "./Detail/detail.scss";

const Genres = () => {
    const { category } = useParams();
    return <>{category === "movie" ? <GenresMovie /> : <GenresTV />}</>;
};

export const GenresMovie = () => {
    const { category, id_genres } = useParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                const genre_id = parseInt(id_genres);
                const params = { with_genres: genre_id };
                console.log(category);
                const popular = "popular";
                switch (category) {
                    case category:
                        response = await tmdbApi.getMoviesList(popular, {
                            params,
                        });
                        // console.log(response);
                        break;
                    default:
                        response = await tmdbApi.getTvList(popular, {
                            params,
                        });
                }
                setItems(response.results);
                setTotalPage(response.total_pages);
                // console.log(response);
            } catch {
                console.log("error");
            }
        };
        getList();
    }, [category, id_genres]);

    const loadMore = async () => {
        try {
            let response = null;
            const genre_id = parseInt(id_genres);
            const popular = "popular";
            const params = {
                page: page + 1,
                with_genres: genre_id,
            };

            switch (category) {
                case category:
                    response = await tmdbApi.getMoviesList(popular, {
                        params,
                    });
                    // console.log(response);
                    break;
                default:
                    response = await tmdbApi.getTvList(popular, {
                        params,
                    });
            }

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    // console.log(items);

    return (
        <div className="container_movie">
            <div className="class_genres">
                {/* <h1>Hellow {id_genres}</h1> */}
                {items.map((item, i) => (
                    <MovieCardGrid key={i} item={item} category={category} />
                ))}
            </div>
            {page < totalPage ? (
                <div
                    className="movie-grid__loadmore"
                    style={{ margin: "auto" }}
                >
                    <ButtonIcon className="outline_default" onClick={loadMore}>
                        Load more
                    </ButtonIcon>
                </div>
            ) : null}
        </div>
    );
};

export const GenresTV = () => {
    const { category, id_genres } = useParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                const genre_id = parseInt(id_genres);
                const params = { with_genres: genre_id };
                console.log(category);
                const popular = "popular";
                switch (category) {
                    case category:
                        response = await tmdbApi.getTvList(popular, {
                            params,
                        });
                        // console.log(response);
                        break;
                    default:
                        response = await tmdbApi.getMoviesList(popular, {
                            params,
                        });
                }
                setItems(response.results);
                setTotalPage(response.total_pages);
                // console.log(response);
            } catch {
                console.log("error");
            }
        };
        getList();
    }, [category, id_genres]);

    const loadMore = async () => {
        try {
            let response = null;
            const genre_id = parseInt(id_genres);
            const popular = "popular";
            const params = {
                page: page + 1,
                with_genres: genre_id,
            };

            switch (category) {
                case category:
                    response = await tmdbApi.getMoviesList(popular, {
                        params,
                    });
                    response = await tmdbApi.getTvList(popular, {
                        params,
                    });
                    // console.log(response);
                    break;
                default:
                    response = await tmdbApi.getMoviesList(popular, {
                        params,
                    });
            }

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    // console.log(items);

    return (
        <div className="container_movie">
            <div className="class_genres">
                {/* <h1>Hellow {id_genres}</h1> */}
                {items.map((item, i) => (
                    <TvCardGrid key={i} item={item} category={category} />
                ))}
            </div>
            {page < totalPage ? (
                <div
                    className="movie-grid__loadmore"
                    style={{ margin: "auto" }}
                >
                    <ButtonIcon className="outline_default" onClick={loadMore}>
                        Load more
                    </ButtonIcon>
                </div>
            ) : null}
        </div>
    );
};

export default Genres;
