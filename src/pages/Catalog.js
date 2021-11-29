import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { movieType, category as cate, tvType } from "../services/tmdbApi";
import { ButtonIcon } from "../components/Button";
import { DiscoverMovieTV, MovieView } from "../components/Movie";
import Hero from "../components/Hero";
import Input from "../components/Input";
import "./Detail/detail.scss";

const Catalog = () => {
    const { category } = useParams();
    return (
        <>
            {category === cate.movie ? (
                <MovieGrid />
            ) : category === cate.tv ? (
                <TvGrid category={category} />
            ) : category === "original" ? (
                <Original />
            ) : null}
        </>
    );
};

const Original = () => {
    return (
        <div>
            <h1>Hallo Original</h1>
        </div>
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
                <div className="card_list_movie">
                    <MovieView
                        judul="Popular Movie"
                        params={{}}
                        category={cate.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Upcoming Movie (New Release)"
                        params={{}}
                        category={cate.movie}
                        type={movieType.upcoming}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Sci-Fi Movies"
                        params={{ with_genres: 878 }}
                        category={cate.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Action & Adventure"
                        params={{ with_genres: "12 | 28" }}
                        category={cate.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Star Wars Movies"
                        params={{ with_companies: 1 }}
                        category={cate.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Disney Animation"
                        params={{ with_companies: 3, with_genres: 16 }}
                        category={cate.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <DiscoverMovieTV
                        judul="Box Office Hits"
                        params={{ sort_by: "revenue.desc" }}
                        category={cate.movie}
                        type={movieType.discover}
                    />
                </div>
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
                <div className="card_list_movie">
                    <MovieView
                        judul="Popular TV"
                        params={{ with_original_language: "en" }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Disney+ Originals"
                        params={{ with_networks: 2739 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Action & Adventure"
                        params={{ with_genres: 10759 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Animated Series"
                        params={{ with_genres: 16 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Marvel Amazing Universe"
                        params={{ with_companies: 420 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <MovieView
                        judul="Kids Series"
                        params={{ with_genres: 10762 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
            </div>
        </>
    );
};

const MovieSearch = (props) => {
    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

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

export default Catalog;
