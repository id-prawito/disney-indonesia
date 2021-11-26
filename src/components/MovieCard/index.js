import React, { useState, useEffect } from "react";
import "./movie_card.scss";
import { Link } from "react-router-dom";
import tmdbApi, { category } from "../../services/tmdbApi";
import { ButtonIcon } from "../Button";
import apiConfig from "../../services/apiConfig";
import nothing from "../../assets/images/nothing.svg";
import "./movie_card.scss";

const MovieCard = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        const getDetail = async () => {
            const params = {};
            setloading(true);
            try {
                const response = await tmdbApi.detail(
                    category.movie || category.tv,
                    item.id,
                    {
                        params,
                    }
                );
                setMovieImages(response);
                // console.log(response);
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [item.id]);

    const d = new Date(movieImages.release_date);
    const year = d.getFullYear();
    const [error, setError] = useState(false);

    // console.log(item);
    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton" />
            ) : (
                <div className="card_movie">
                    <Link to={link}>
                        <div className={`movie-card ${props.className}`}>
                            <img
                                src={bg}
                                alt="aa"
                                error={error ? 1 : 0}
                                onError={(e) => {
                                    setError(true);
                                    if (e.target.src !== `${nothing}`) {
                                        e.target.src = `${nothing}`;
                                    }
                                }}
                            />
                            <div className="details">
                                <div className="pembungkus">
                                    <span className="text_judul">
                                        {item.title || item.name}
                                    </span>
                                    <div className="sub-info">
                                        <div className="subtitle">
                                            {`${movieImages.runtime} Min,`}
                                            {movieImages.genres &&
                                                movieImages.genres
                                                    .slice(0, 4)
                                                    .map((genre, i) => (
                                                        <span
                                                            key={i}
                                                            className="genres__item"
                                                        >
                                                            {` ${genre.name}, `}
                                                        </span>
                                                    ))}
                                            {year}.
                                        </div>
                                    </div>
                                    <span className="deskripsi">
                                        {item.overview}
                                    </span>
                                    <ButtonIcon className="icon_small_transparent">
                                        Watch Trailer
                                    </ButtonIcon>
                                    <ButtonIcon className="icon_small_transparent">
                                        Add to Watchlist
                                    </ButtonIcon>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export const MovieCardSimilar = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg = apiConfig.w500Image(item.backdrop_path);
    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        const getDetail = async () => {
            const params = {};
            setloading(true);
            try {
                const response = await tmdbApi.detail(category.movie, item.id, {
                    params,
                });
                setMovieImages(response);
                // console.log(response);
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [item.id]);

    const d = new Date(movieImages.release_date);
    const year = d.getFullYear();

    const [movieImagesSimilar, setMovieImagesSimilar] = useState([]);
    // const [isLoading, setloading] = useState(true);
    useEffect(() => {
        const getImages = async () => {
            // setloading(true);
            try {
                const response = await tmdbApi.getImages(
                    category.movie || category.tv,
                    item.id
                );

                // console.log(response);

                for (let i = 0; i < response.backdrops.length - 1; i++) {
                    if (response.backdrops[i].iso_639_1 === "en") {
                        const Objectnya = {
                            logosnya: response.backdrops[i].file_path,
                        };
                        setMovieImagesSimilar(Objectnya);
                        break;
                    }
                }
            } catch {
                console.log("error");
            }
            // setloading(false);
        };
        getImages();
    }, [item.id, props.category]);

    const imagesLogo =
        apiConfig.w500Image(movieImagesSimilar.logosnya) ||
        apiConfig.originalImage(movieImagesSimilar.logosnya);

    // console.log(imagesLogo);
    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton" />
            ) : (
                <div className="card_movie">
                    <Link to={link}>
                        <div className={`movie-card ${props.className}`}>
                            {imagesLogo === null ? (
                                <img src={bg} alt="aa" />
                            ) : (
                                <img src={imagesLogo} alt="aa" />
                            )}
                            <div className="details">
                                <div className="pembungkus">
                                    <span className="text_judul">
                                        {item.title || item.name}
                                    </span>
                                    <div className="sub-info">
                                        <div className="subtitle">
                                            {`${movieImages.runtime} Min,`}
                                            {movieImages.genres &&
                                                movieImages.genres
                                                    .slice(0, 4)
                                                    .map((genre, i) => (
                                                        <span
                                                            key={i}
                                                            className="genres__item"
                                                        >
                                                            {` ${genre.name}, `}
                                                        </span>
                                                    ))}
                                            {year}.
                                        </div>
                                    </div>
                                    <span className="deskripsi">
                                        {item.overview}
                                    </span>
                                    <ButtonIcon className="icon_small_transparent">
                                        Watch Trailer
                                    </ButtonIcon>
                                    <ButtonIcon className="icon_small_transparent">
                                        Add to Watchlist
                                    </ButtonIcon>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export const TvCard = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    const [movieImagesTv, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);
    useEffect(() => {
        const getDetail = async () => {
            const params = { movie_id: item.id };
            setloading(true);
            try {
                const response = await tmdbApi.detail(category.tv, item.id, {
                    params,
                });
                // console.log(response);
                setMovieImages(response);
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [item.id]);
    const d = new Date(movieImagesTv.first_air_date);
    const year = d.getFullYear();
    const [error, setError] = useState(false);
    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton" />
            ) : (
                <div className="card_movie">
                    <Link to={link}>
                        <div className={`movie-card ${props.className}`}>
                            <img
                                src={bg}
                                alt="aa"
                                error={error ? 1 : 0}
                                onError={(e) => {
                                    setError(true);
                                    if (e.target.src !== `${nothing}`) {
                                        e.target.src = `${nothing}`;
                                    }
                                }}
                            />
                            <div className="details">
                                <div className="pembungkus">
                                    <span className="text_judul">
                                        {item.title || item.name}
                                    </span>
                                    <div className="sub-info">
                                        <div className="subtitle">
                                            {`${movieImagesTv.number_of_episodes}` +
                                                " Episode,"}
                                            {movieImagesTv.genres &&
                                                movieImagesTv.genres
                                                    .slice(0, 4)
                                                    .map((genre, i) => (
                                                        <span
                                                            key={i}
                                                            className="genres__item"
                                                        >
                                                            {" " +
                                                                `${genre.name}` +
                                                                ","}{" "}
                                                        </span>
                                                    ))}
                                            {year}.
                                        </div>
                                    </div>
                                    <span className="deskripsi">
                                        {item.overview}
                                    </span>
                                    <ButtonIcon className="icon_small_transparent">
                                        <div href="/movie">View More</div>
                                    </ButtonIcon>
                                    <ButtonIcon className="icon_small_transparent">
                                        <div href="/movie">View More</div>
                                    </ButtonIcon>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export const TvCardSimilar = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg = apiConfig.w500Image(item.backdrop_path || item.poster_path);
    const [movieImagesTv, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);
    useEffect(() => {
        const getDetail = async () => {
            const params = { movie_id: item.id };
            setloading(true);
            try {
                const response = await tmdbApi.detail(category.tv, item.id, {
                    params,
                });
                // console.log(response);
                setMovieImages(response);
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [item.id]);
    const d = new Date(movieImagesTv.first_air_date);
    const year = d.getFullYear();

    const [movieImagesSimilar, setMovieImagesSimilar] = useState([]);
    // const [isLoading, setloading] = useState(true);
    useEffect(() => {
        const getImages = async () => {
            // setloading(true);
            try {
                const response = await tmdbApi.getImages(category.tv, item.id);

                // console.log(response);

                for (let i = 0; i < response.backdrops.length - 1; i++) {
                    if (response.backdrops[i].iso_639_1 === "en") {
                        const Objectnya = {
                            logosnya: response.backdrops[i].file_path,
                        };
                        setMovieImagesSimilar(Objectnya);
                        break;
                    }
                }
            } catch {
                console.log("error");
            }
            // setloading(false);
        };
        getImages();
    }, [item.id, props.category]);

    const imagesLogo =
        apiConfig.w500Image(movieImagesSimilar.logosnya) ||
        apiConfig.originalImage(movieImagesSimilar.logosnya);

    console.log(imagesLogo);
    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton" />
            ) : (
                <div className="card_movie">
                    <Link to={link}>
                        <div className={`movie-card ${props.className}`}>
                            {imagesLogo === null ? (
                                <img src={bg} alt="aa" />
                            ) : (
                                // <img src={bg} alt="aa" />
                                <img src={imagesLogo} alt="aa" />
                            )}

                            <div className="details">
                                <div className="pembungkus">
                                    <span className="text_judul">
                                        {item.title || item.name}
                                    </span>
                                    <div className="sub-info">
                                        <div className="subtitle">
                                            {`${movieImagesTv.number_of_episodes}` +
                                                " Episode,"}
                                            {movieImagesTv.genres &&
                                                movieImagesTv.genres
                                                    .slice(0, 4)
                                                    .map((genre, i) => (
                                                        <span
                                                            key={i}
                                                            className="genres__item"
                                                        >
                                                            {" " +
                                                                `${genre.name}` +
                                                                ","}{" "}
                                                        </span>
                                                    ))}
                                            {year}.
                                        </div>
                                    </div>
                                    <span className="deskripsi">
                                        {item.overview}
                                    </span>
                                    <ButtonIcon className="icon_small_transparent">
                                        <div href="/movie">View More</div>
                                    </ButtonIcon>
                                    <ButtonIcon className="icon_small_transparent">
                                        <div href="/movie">View More</div>
                                    </ButtonIcon>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default MovieCard;
