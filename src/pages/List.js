// import React, { useState } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useLocation } from "react-router-dom";
import { ButtonIcon } from "../components/Button";
import { MovieCardGrid, TvCardGrid } from "../components/MovieCard";
import tmdbApi from "../services/tmdbApi";

const List = () => {
    const { category, type } = useParams();
    const location = useLocation();
    const { params } = location.state;

    return (
        <>
            {params === undefined ? (
                <h4>Tidak ada</h4>
            ) : (
                <div>
                    {category === "movie" && type === "discover" ? (
                        <ListDiscover />
                    ) : category === "movie" && type === "similar" ? (
                        <ListSimilar />
                    ) : category === "movie" && type === "recomendations" ? (
                        <ListSimilar />
                    ) : category === "tv" && type === "discover" ? (
                        <ListDiscover />
                    ) : category === "tv" && type === "similar" ? (
                        <ListSimilar />
                    ) : category === "tv" && type === "recomendations" ? (
                        <ListSimilar />
                    ) : category === "movie" ? (
                        <ListMovie />
                    ) : category === "tv" ? (
                        <ListTV />
                    ) : null}
                </div>
            )}
        </>
    );
};

export const ListMovie = () => {
    const { category, type } = useParams();
    const location = useLocation();
    const { params, judulnya } = location.state;
    // console.log(params);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            const response = await tmdbApi.getMoviesList(type, {
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

            // console.log(response);
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [type, category, params]);

    const parameter = params;

    const loadMore = async () => {
        try {
            let response = null;
            const params = {
                page: page + 1,
                ...parameter,
            };

            // console.log(params);
            // console.log(type);

            switch (category) {
                case category:
                    response = await tmdbApi.getMoviesList(type, {
                        params,
                    });
                    // console.log(response);
                    break;
                default:
                    response = await tmdbApi.getTvList(type, {
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

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    // console.log(params);

    console.log(items);
    return (
        <div className="container_movie">
            <div className="judul_list">{judulnya}</div>
            <div className="class_genres">
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

export const ListTV = () => {
    const { category, type } = useParams();
    const location = useLocation();
    const { params, judulnya } = location.state;
    // console.log(params);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            const response = await tmdbApi.getTvList(type, {
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

            // console.log(response);
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [type, category, params]);

    const parameter = params;

    const loadMore = async () => {
        try {
            let response = null;
            const params = {
                page: page + 1,
                ...parameter,
            };

            console.log(params);

            switch (category) {
                case category:
                    response = await tmdbApi.getTvList(type, {
                        params,
                    });
                    // console.log(response);
                    break;
                default:
                    response = await tmdbApi.getMoviesList(type, {
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

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    // console.log(params);

    console.log(items);
    return (
        <div className="container_movie">
            <h3>{judulnya}</h3>
            <div className="class_genres">
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

export const ListDiscover = () => {
    const { category, type } = useParams();
    const location = useLocation();
    const { params, judulnya } = location.state;
    // console.log(params);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            const response = await tmdbApi.getNewMovies(type, {
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

            // console.log(response);
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [type, category, params]);

    const parameter = params;

    const loadMore = async () => {
        try {
            let response = null;
            const params = {
                page: page + 1,
                ...parameter,
            };

            console.log(params);

            switch (category) {
                case category:
                    response = await tmdbApi.getNewMovies(type, {
                        params,
                    });
                    // console.log(response);
                    break;
                default:
                    response = await tmdbApi.getNewTV(type, {
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

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    // console.log(params);

    console.log(items);
    return (
        <div className="container_movie">
            <div className="judul_list">{judulnya}</div>
            <div className="class_genres">
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

export const ListSimilar = () => {
    const { category, type } = useParams();
    const location = useLocation();
    const { params, judulnya, idnya } = location.state;
    // console.log(params);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (type === "similar") {
                response = await tmdbApi.similar(category, idnya);
            } else {
                response = await tmdbApi.recomendations(category, idnya);
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

            // console.log(response);
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [type, category, idnya]);

    const [nama, setNama] = useState([]);

    useEffect(() => {
        const getNamanya = async () => {
            const response = await tmdbApi.detail(category, idnya, {
                params: {},
            });
            console.log(response);
            setNama(response);
        };
        getNamanya();
    }, [category, idnya]);

    // console.log(nama);

    const parameter = params;

    const loadMore = async () => {
        try {
            let response = null;
            const params = {
                page: page + 1,
                ...parameter,
            };

            console.log(params);

            if (type === "similar") {
                response = await tmdbApi.similar(category, idnya, {
                    params,
                });
            } else {
                response = await tmdbApi.recomendations(category, idnya, {
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

            // const response = await tmdbApi.search(category, { params });
            setItems([...items, ...response.results]);
            setPage(page + 1);
        } catch {
            console.log("sorry error");
        }
    };

    console.log(params);

    // console.log(items);
    return (
        <div className="container_movie">
            {category === "movie" ? (
                <div className="judul_list">{`${judulnya} from ${nama.title}`}</div>
            ) : (
                <div className="judul_list">{`${judulnya} from ${nama.name}`}</div>
            )}

            {category === "movie" ? (
                <div className="class_genres">
                    {items.map((item, i) => (
                        <MovieCardGrid
                            key={i}
                            item={item}
                            category={category}
                        />
                    ))}
                </div>
            ) : (
                <div className="class_genres">
                    {items.map((item, i) => (
                        <TvCardGrid key={i} item={item} category={category} />
                    ))}
                </div>
            )}
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

export default List;
