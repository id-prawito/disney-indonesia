import React from "react";
import { ButtonIconView } from "../Button";
import Movie, { DiscoverMovieTV } from "../Movie";
import { category, movieType, tvType } from "../../services/tmdbApi";
import { Link } from "react-router-dom";
import "./list.scss";

const ListHome = () => {
    return (
        <div className="container_movie">
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Popular Movie</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    params={{}}
                    category={category.movie}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Popular TV (Serial)</h3>
                    <Link to="/tv">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    params={{}}
                    category={category.tv}
                    type={movieType.popular}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Disney+ Originals</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    params={{ with_networks: 2739 }}
                    category={category.tv}
                    type={tvType.popular}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Upcoming Movie</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    params={{}}
                    category={category.movie}
                    type={movieType.upcoming}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Now Playing Movie</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    params={{}}
                    category={category.movie}
                    type={movieType.now_playing}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Movie Fantasy Petualangan</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    category={category.movie}
                    type={movieType.popular}
                    params={{ with_genres: 14 || 12 }}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>TV Fantasy Petualangan</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    category={category.tv}
                    type={tvType.top_rated}
                    params={{ with_genres: 10765 }}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Movie Disney+</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <DiscoverMovieTV
                    params={{ with_companies: 2 }}
                    category={category.movie}
                    type={movieType.discover}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Movie Disney Fantasy & Animation</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    category={category.movie}
                    type={movieType.popular}
                    params={{ with_genres: 14 && 16, with_companies: 2 }}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Movie Walt Disney Pixar</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    category={category.movie}
                    type={movieType.popular}
                    params={{ with_companies: 3 }}
                />
            </div>
            <div className="card_list_movie">
                <div className="judul_view_more">
                    <h3>Movie Marvel</h3>
                    <Link to="/movie">
                        <ButtonIconView className="icon_small">
                            View More
                        </ButtonIconView>
                    </Link>
                </div>
                <Movie
                    category={category.movie}
                    type={movieType.popular}
                    params={{ with_companies: 420 }}
                />
            </div>
        </div>
    );
};

export default ListHome;
