import React, { useEffect, useState } from "react";
import { MovieCardGrid, TvCardGrid } from "../components/MovieCard";
import { useParams } from "react-router";
import { ButtonIcon } from "../components/Button";
import tmdbApi from "../services/tmdbApi";
import "./Detail/detail.scss";

const Genres = () => {
    const { category } = useParams();
    return <>{category === "movie" ? <GenresMovie /> : <GenresTV />}</>;
};

export const GenresMovie = () => {
    const { category, id_genres } = useParams();
    const [totalPage, setTotalPage] = useState(0);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                const genre_id = parseInt(id_genres);
                const params = { with_genres: genre_id };
                // console.log(category);
                const popular = "popular";
                switch (category) {
                    case category:
                        response = await tmdbApi.getMoviesList(popular, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(popular, {
                            params,
                        });
                }
                setItems(response.results);
                setTotalPage(response.total_pages);
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
                    break;
                default:
                    response = await tmdbApi.getTvList(popular, {
                        params,
                    });
            }

            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    return (
        <div className="container_movie">
            <div className="judul_list">
                Genres :{" "}
                {id_genres === "28"
                    ? "Action"
                    : id_genres === "12"
                    ? "Adventure"
                    : id_genres === "16"
                    ? "Animation"
                    : id_genres === "35"
                    ? "Comedy"
                    : id_genres === "80"
                    ? "Crime"
                    : id_genres === "99"
                    ? "Documentary"
                    : id_genres === "18"
                    ? "Drama"
                    : id_genres === "10751"
                    ? "Family"
                    : id_genres === "14"
                    ? "Fantasy"
                    : id_genres === "36"
                    ? "History"
                    : id_genres === "27"
                    ? "Horror"
                    : id_genres === "10402"
                    ? "Music"
                    : id_genres === "9648"
                    ? "Mystery"
                    : id_genres === "10749"
                    ? "Romance"
                    : id_genres === "878"
                    ? "Science Fiction"
                    : id_genres === "10770"
                    ? "TV Movie"
                    : id_genres === "53"
                    ? "Thriller"
                    : id_genres === "10752"
                    ? "War"
                    : id_genres === "37"
                    ? "Western"
                    : null}
            </div>
            <div className="class_genres">
                {items.map((item, i) => (
                    <MovieCardGrid key={i} item={item} category={category} />
                ))}
            </div>
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

export const GenresTV = () => {
    const { category, id_genres } = useParams();
    const [totalPage, setTotalPage] = useState(0);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

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
                        break;
                    default:
                        response = await tmdbApi.getMoviesList(popular, {
                            params,
                        });
                }
                setItems(response.results);
                setTotalPage(response.total_pages);
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
                    break;
                default:
                    response = await tmdbApi.getMoviesList(popular, {
                        params,
                    });
            }

            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    return (
        <div className="container_movie">
            <div className="judul_list">
                Genres :{" "}
                {id_genres === "10759"
                    ? "Action & Adventure"
                    : id_genres === "16"
                    ? "Animation"
                    : id_genres === "35"
                    ? "Comedy"
                    : id_genres === "80"
                    ? "Crime"
                    : id_genres === "99"
                    ? "Documentary"
                    : id_genres === "18"
                    ? "Drama"
                    : id_genres === "10751"
                    ? "Family"
                    : id_genres === "10762"
                    ? "Kids"
                    : id_genres === "9648"
                    ? "Mystery"
                    : id_genres === "10763"
                    ? "News"
                    : id_genres === "10764"
                    ? "Reality"
                    : id_genres === "10765"
                    ? "Sci-Fi & Fantasy"
                    : id_genres === "10766"
                    ? "Soap"
                    : id_genres === "10767"
                    ? "Talk"
                    : id_genres === "10768"
                    ? "War & Politics"
                    : id_genres === "37"
                    ? "Western"
                    : null}
            </div>
            <div className="class_genres">
                {items.map((item, i) => (
                    <TvCardGrid key={i} item={item} category={category} />
                ))}
            </div>
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

export default Genres;
