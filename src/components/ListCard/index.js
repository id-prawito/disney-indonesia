import { category, movieType, tvType } from "../../services/tmdbApi";
import { MovieView, DiscoverMovieTV } from "../Movie";
import React from "react";
import "./list.scss";

const ListHome = () => {
    return (
        <div className="container_movie">
            <div className="card_list_movie">
                <MovieView
                    judul="Popular Movie"
                    params={{}}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Upcoming Movie"
                    params={{}}
                    category={category.movie}
                    type={movieType.upcoming}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Now Playing Movie"
                    params={{}}
                    category={category.movie}
                    type={movieType.now_playing}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Movie Disney Fantasy & Animation"
                    params={{ with_genres: "14 | 16", with_companies: 2 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Movie Walt Disney Pixar"
                    params={{ with_companies: 3 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Movie Marvel"
                    params={{ with_companies: 420 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Movie Fantasy Petualangan"
                    params={{ with_genres: "14 | 12" }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Disney+ Originals"
                    params={{ with_networks: 2739 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Popular TV (Serial)"
                    params={{}}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="TV Fantasy Petualangan"
                    params={{ with_genres: 10765 }}
                    category={category.tv}
                    type={tvType.top_rated}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Movie Disney+"
                    params={{ with_companies: 2 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
        </div>
    );
};

export const ListMovie = () => {
    return (
        <>
            <div className="card_list_movie">
                <MovieView
                    judul="Popular Movie"
                    params={{}}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Upcoming Movie (New Release)"
                    params={{}}
                    category={category.movie}
                    type={movieType.upcoming}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Sci-Fi Movies"
                    params={{ with_genres: 878 }}
                    category={category.movie}
                    type={movieType.top_rated}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Action & Adventure"
                    params={{ with_genres: "12 | 28" }}
                    category={category.movie}
                    type={movieType.top_rated}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Star Wars Movies"
                    params={{ with_companies: 1 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Disney Animation"
                    params={{ with_companies: 3, with_genres: 16 }}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <DiscoverMovieTV
                    judul="Box Office Hits"
                    params={{ sort_by: "revenue.desc" }}
                    category={category.movie}
                    type={movieType.discover}
                />
            </div>
        </>
    );
};

export const ListTV = () => {
    return (
        <>
            <div className="card_list_movie">
                <MovieView
                    judul="Popular TV"
                    params={{ with_original_language: "en" }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Disney+ Originals"
                    params={{ with_networks: 2739 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Action & Adventure"
                    params={{ with_genres: 10759 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Animated Series"
                    params={{ with_genres: 16 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Marvel Amazing Universe"
                    params={{ with_companies: 420 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <MovieView
                    judul="Kids Series"
                    params={{ with_genres: 10762 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
        </>
    );
};

export default ListHome;
