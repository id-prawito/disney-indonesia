import React from "react";
import { MovieView } from "../Movie";
import { category, movieType, tvType } from "../../services/tmdbApi";
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

export default ListHome;
