import React, { useState, useEffect, useContext } from "react";
import { ButtonIcon, ButtonIconFaMinus, ButtonIconFaPlus } from "../Button";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import tmdbApi, { category } from "../../services/tmdbApi";
import { GlobalContext } from "../../config/GlobalState";
import nothing from "../../assets/images/images_not-found.png";
import loading_image from "../../assets/images/loading_image.png";
import apiConfig from "../../services/apiConfig";
import "./movie_card.scss";

const MovieCard = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg =
        apiConfig.w500Image(item.poster_path || item.backdrop_path) ||
        apiConfig.originalImage(item.poster_path || item.backdrop_path);
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

    // Watchlist Function
    const { addMovieToWatchlist, watchlist, removeMovieFromWatchlist } =
        useContext(GlobalContext);
    let storedMovie = watchlist.find((o) => o.id === item.id);
    const watchlistDisabled = storedMovie ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div className={`movie-card ${props.className}`}>
                        <Link to={link}>
                            <img
                                src={bg}
                                alt="card_images"
                                error={error ? 1 : 0}
                                onError={(e) => {
                                    setError(true);
                                    if (e.target.src !== `${nothing}`) {
                                        e.target.src = `${nothing}`;
                                    }
                                }}
                            />
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeMovieFromWatchlist(item.id)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() =>
                                            addMovieToWatchlist(item)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const TvCard = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg =
        apiConfig.w500Image(item.poster_path || item.backdrop_path) ||
        apiConfig.originalImage(item.poster_path || item.backdrop_path);
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

    // Watchlist Function
    const { addTvToWatchlist, watchlistTv, removeTvFromWatchlist } =
        useContext(GlobalContext);
    let storedTv = watchlistTv.find((o) => o.id === item.id);
    const watchlistTvDisabled = storedTv ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div className={`movie-card ${props.className}`}>
                        <Link to={link}>
                            {item.backdrop_path !== null ? (
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
                            ) : (
                                <img src={nothing} alt="aa" />
                            )}
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistTvDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeTvFromWatchlist(item.id)
                                        }
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() => addTvToWatchlist(item)}
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const MovieCardGrid = (props) => {
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

    // Watchlist Function
    const { addMovieToWatchlist, watchlist, removeMovieFromWatchlist } =
        useContext(GlobalContext);
    let storedMovie = watchlist.find((o) => o.id === item.id);
    const watchlistDisabled = storedMovie ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton_grid">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                        className={`movie-card ${props.className}`}
                    >
                        <Link to={link}>
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
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeMovieFromWatchlist(item.id)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() =>
                                            addMovieToWatchlist(item)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const TvCardGrid = (props) => {
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

    // Watchlist Function
    const { addTvToWatchlist, watchlistTv, removeTvFromWatchlist } =
        useContext(GlobalContext);
    let storedTv = watchlistTv.find((o) => o.id === item.id);
    const watchlistTvDisabled = storedTv ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton_grid">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                        className={`movie-card ${props.className}`}
                    >
                        <Link to={link}>
                            {item.backdrop_path !== null ? (
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
                            ) : (
                                <img src={nothing} alt="aa" />
                            )}
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistTvDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeTvFromWatchlist(item.id)
                                        }
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() => addTvToWatchlist(item)}
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
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

    useEffect(() => {
        const getImages = async () => {
            // setloading(true);
            try {
                const response = await tmdbApi.getImages(
                    category.movie || category.tv,
                    item.id
                );
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

    // Watchlist Function
    const { addMovieToWatchlist, watchlist, removeMovieFromWatchlist } =
        useContext(GlobalContext);
    let storedMovie = watchlist.find((o) => o.id === item.id);
    const watchlistDisabled = storedMovie ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div className={`movie-card ${props.className}`}>
                        <Link to={link}>
                            {imagesLogo === null ? (
                                <img src={bg} alt="aa" />
                            ) : (
                                <img src={imagesLogo} alt="aa" />
                            )}
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeMovieFromWatchlist(item.id)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() =>
                                            addMovieToWatchlist(item)
                                        }
                                        disabled={watchlistDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
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

    useEffect(() => {
        const getImages = async () => {
            // setloading(true);
            try {
                const response = await tmdbApi.getImages(category.tv, item.id);
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

    // Watchlist Function
    const { addTvToWatchlist, watchlistTv, removeTvFromWatchlist } =
        useContext(GlobalContext);
    let storedTv = watchlistTv.find((o) => o.id === item.id);
    const watchlistTvDisabled = storedTv ? true : false;

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="card_movie">
                    <div className={`movie-card ${props.className}`}>
                        <Link to={link}>
                            {imagesLogo === null ? (
                                <img src={bg} alt="aa" />
                            ) : (
                                <img src={imagesLogo} alt="aa" />
                            )}
                        </Link>
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
                                <Link to={link}>
                                    <ButtonIcon className="icon_small_transparent">
                                        View More
                                    </ButtonIcon>
                                </Link>
                                {watchlistTvDisabled === true ? (
                                    <ButtonIconFaMinus
                                        onClick={() =>
                                            removeTvFromWatchlist(item.id)
                                        }
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Remove from Watchlist
                                    </ButtonIconFaMinus>
                                ) : (
                                    <ButtonIconFaPlus
                                        onClick={() => addTvToWatchlist(item)}
                                        disabled={watchlistTvDisabled}
                                        className="icon_small_transparent"
                                    >
                                        Add to Watchlist
                                    </ButtonIconFaPlus>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const MovieCardSearch = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
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
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [item.id]);

    const d = new Date(movieImages.release_date);
    const year = d.getFullYear();

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <>
                    <div className="movie-card_search">
                        <div className="movie-card-search">
                            <Link to={link}>
                                {item.poster_path === null ? (
                                    <img src={nothing} alt="not_found" />
                                ) : (
                                    <img
                                        src={apiConfig.w500Image(
                                            item.poster_path
                                        )}
                                        alt="aa"
                                    />
                                )}
                            </Link>
                        </div>
                        <div className="info_card">
                            <div className="nama">
                                <div className="judul">{item.title}</div>
                                <div className="runtime">
                                    {`${movieImages.runtime} Min, ${year}`}
                                </div>
                            </div>
                            <div className="content">
                                <FaStar fontSize={12} />
                                {item.vote_average}
                            </div>
                            <div className="subtitle_search">
                                {movieImages.genres &&
                                    movieImages.genres
                                        .slice(0, 3)
                                        .map((genre, i) => (
                                            <div
                                                key={i}
                                                className="genres_search"
                                            >
                                                {` ${genre.name}, `}
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const TvCardSearch = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
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

    return (
        <>
            {isLoading ? (
                <div className="movie-card-skeleton">
                    <img src={loading_image} alt="loading.." />
                </div>
            ) : (
                <div className="movie-card_search">
                    <div className="movie-card-search">
                        <Link to={link}>
                            {item.poster_path === null ? (
                                <img src={nothing} alt="not_found" />
                            ) : (
                                <img
                                    src={apiConfig.w500Image(item.poster_path)}
                                    alt="aa"
                                />
                            )}
                        </Link>
                    </div>
                    <div className="info_card">
                        <div className="nama">
                            <div className="judul">{item.name}</div>
                            <div className="runtime">
                                {`${movieImagesTv.number_of_episodes} Episode, ${year}`}
                            </div>
                        </div>
                        <div className="content">
                            <FaStar fontSize={12} />
                            {item.vote_average}
                        </div>
                        <div className="subtitle_search">
                            {movieImagesTv.genres &&
                                movieImagesTv.genres
                                    .slice(0, 3)
                                    .map((genre, i) => (
                                        <div key={i} className="genres_search">
                                            {` ${genre.name}, `}
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieCard;
