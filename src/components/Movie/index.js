import { SwiperSlide, Swiper } from "swiper/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tmdbApi, { category } from "../../services/tmdbApi";
import PropTypes from "prop-types";
import { ButtonIconView } from "../Button";
import MovieCard, {
    MovieCardSimilar,
    TvCard,
    TvCardSimilar,
} from "../MovieCard";
import "./movie.scss";

const Movie = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }

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
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={20} slidesPerView={8}>
                {items.slice(0, 1).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCard
                                className="tambahan"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCard
                                className="tambahan"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
                {items.slice(1, 19).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCard
                                className="card_slide"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCard
                                className="card_slide"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
                {items.slice(19, 20).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCard
                                className="tambahan_kanan"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCard
                                className="tambahan_kanan"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

Movie.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export const MovieView = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id, {
                    params,
                });
            }

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
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    const params = props.params;
    const judulnya = props.judul;
    const idnya = props.id;

    return (
        <>
            <div className="judul_view_more">
                <div className="text_video">{props.judul}</div>
                <Link
                    to={{
                        pathname: `/${props.category}/list/${props.type}`,
                        state: {
                            params,
                            judulnya,
                            idnya,
                        },
                    }}
                >
                    <ButtonIconView className="icon_small">
                        <div className="text_watchlist">View More</div>
                    </ButtonIconView>
                </Link>
            </div>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={8}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },

                        680: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        // when window width is >= 640px
                        769: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1224: {
                            slidesPerView: 8,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {items.slice(0, 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(1, 19).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(19, 20).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

MovieView.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export const MovieRecomendations = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "recomendations") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.recomendations(
                    props.category,
                    props.id,
                    {
                        params,
                    }
                );
            }

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
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    const params = props.params;
    const judulnya = props.judul;
    const idnya = props.id;

    return (
        <>
            {items.length === 0 ? (
                <>
                    <div className="judul_view_more">
                        <div className="text_video">{props.judul}</div>
                    </div>
                    <div className="movie-card-not_found">
                        <h4>{props.category} Not Found</h4>
                    </div>
                </>
            ) : (
                <>
                    <div className="judul_view_more">
                        <div className="text_video">{props.judul}</div>
                        <Link
                            to={{
                                pathname: `/${props.category}/list/${props.type}`,
                                state: {
                                    params,
                                    judulnya,
                                    idnya,
                                },
                            }}
                        >
                            <ButtonIconView className="icon_small">
                                <div className="text_watchlist">View More</div>
                            </ButtonIconView>
                        </Link>
                    </div>
                    <div className="movie-list">
                        <Swiper
                            grabCursor={true}
                            spaceBetween={20}
                            slidesPerView={8}
                            breakpoints={{
                                // when window width is >= 320px
                                320: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 480px
                                481: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                680: {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 640px
                                769: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                1224: {
                                    slidesPerView: 8,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {items.slice(0, 1).map((item, i) => (
                                <SwiperSlide key={i}>
                                    {props.category === "movie" ? (
                                        <MovieCard
                                            className="tambahan"
                                            item={item}
                                            category={props.category}
                                        />
                                    ) : (
                                        <TvCard
                                            className="tambahan"
                                            item={item}
                                            category={props.category}
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                            {items.slice(1, 19).map((item, i) => (
                                <SwiperSlide key={i}>
                                    {props.category === "movie" ? (
                                        <MovieCard
                                            className="card_slide"
                                            item={item}
                                            category={props.category}
                                        />
                                    ) : (
                                        <TvCard
                                            className="card_slide"
                                            item={item}
                                            category={props.category}
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                            {items.slice(19, 20).map((item, i) => (
                                <SwiperSlide key={i}>
                                    {props.category === "movie" ? (
                                        <MovieCard
                                            className="tambahan_kanan"
                                            item={item}
                                            category={props.category}
                                        />
                                    ) : (
                                        <TvCard
                                            className="tambahan_kanan"
                                            item={item}
                                            category={props.category}
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </>
            )}
        </>
    );
};

MovieRecomendations.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export const MovieSimilar = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }

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
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={6}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    481: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    680: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    // when window width is >= 640px
                    769: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1224: {
                        slidesPerView: 8,
                        spaceBetween: 20,
                    },
                }}
            >
                {items.slice(0, 1).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCardSimilar
                                className="tambahan"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCardSimilar
                                className="tambahan"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
                {items.slice(1, 19).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCardSimilar
                                className="card_slide"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCardSimilar
                                className="card_slide"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
                {items.slice(19, 20).map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie" ? (
                            <MovieCardSimilar
                                className="tambahan_kanan"
                                item={item}
                                category={props.category}
                            />
                        ) : (
                            <TvCardSimilar
                                className="tambahan_kanan"
                                item={item}
                                category={props.category}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieSimilar.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export const DiscoverMovieTV = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getNewMovies(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getNewTV(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }

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
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    const params = props.params;
    const judulnya = props.judul;

    return (
        <>
            <div className="judul_view_more">
                <h3>{props.judul}</h3>
                <Link
                    to={{
                        pathname: `/${props.category}/list/${props.type}`,
                        state: {
                            params,
                            judulnya,
                        },
                    }}
                >
                    <ButtonIconView className="icon_small">
                        View More
                    </ButtonIconView>
                </Link>
            </div>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={8}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        // when window width is >= 480px
                        481: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        680: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        // when window width is >= 640px
                        769: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1224: {
                            slidesPerView: 8,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {items.slice(0, 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(1, 19).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(19, 20).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export const DiscoverMovieTVNotWill = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = props.params;
            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getNewMovies(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getNewTV(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }

            setItems(response.results);
        };
        getList();
    }, [props.type, props.category, props.id, props.params]);

    const params = props.params;
    const judulnya = props.judul;

    return (
        <>
            <div className="judul_view_more">
                <h3>{props.judul}</h3>
                <Link
                    to={{
                        pathname: `/${props.category}/list/${props.type}`,
                        state: {
                            params,
                            judulnya,
                        },
                    }}
                >
                    <ButtonIconView className="icon_small">
                        View More
                    </ButtonIconView>
                </Link>
            </div>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={8}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        // when window width is >= 480px
                        481: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        680: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        // when window width is >= 640px
                        769: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1224: {
                            slidesPerView: 8,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {items.slice(0, 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(1, 19).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="card_slide"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                    {items.slice(19, 20).map((item, i) => (
                        <SwiperSlide key={i}>
                            {props.category === "movie" ? (
                                <MovieCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            ) : (
                                <TvCard
                                    className="tambahan_kanan"
                                    item={item}
                                    category={props.category}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

DiscoverMovieTV.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export default Movie;
