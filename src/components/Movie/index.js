import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SwiperSlide, Swiper } from "swiper/react";
import tmdbApi, { category } from "../../services/tmdbApi";
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

    // console.log(items);
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
                    props.id
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
            <Swiper grabCursor={true} spaceBetween={20} slidesPerView={6}>
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
            // setItems(response.results);

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

            // console.log(response);
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

DiscoverMovieTV.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
};

export default Movie;
