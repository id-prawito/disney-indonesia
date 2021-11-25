import React from "react";
import { useParams } from "react-router";
import { movieType, category as cate, tvType } from "../services/tmdbApi";
import { ButtonIconView } from "../components/Button";
import { Link } from "react-router-dom";
import Movie, { DiscoverMovieTV } from "../components/Movie";
import Hero from "../components/Hero";

const Catalog = () => {
    const { category } = useParams();

    return <>{category === cate.movie ? <MovieGrid /> : <TvGrid />}</>;
};

const MovieGrid = () => {
    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.movie}
            />
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
                        category={cate.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Upcoming Movie (New Release)</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{}}
                        category={cate.movie}
                        type={movieType.upcoming}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Box Office Hits</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <DiscoverMovieTV
                        params={{ sort_by: "revenue.desc" }}
                        category={cate.movie}
                        type={movieType.discover}
                    />
                </div>

                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Sci-Fi Movies</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_genres: 878 }}
                        category={cate.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Action & Adventure</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_genres: 12 || 28 }}
                        category={cate.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Star Wars Movies</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        category={cate.movie}
                        type={movieType.popular}
                        params={{ with_companies: 1 }}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Disney Animation</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <DiscoverMovieTV
                        params={{ with_companies: 3, with_genres: 16 }}
                        category={cate.movie}
                        type={movieType.discover}
                    />
                </div>
            </div>
        </>
    );
};

const TvGrid = () => {
    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.tv}
            />
            <div className="container_movie">
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Popular TV</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_original_language: "en" }}
                        category={cate.tv}
                        type={tvType.popular}
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
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Action & Adventure</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_genres: 10759 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Animated Series</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_genres: 16 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Marvel Amazing Universe</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_companies: 420 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <h3>Kids Series</h3>
                        <Link to="/movie">
                            <ButtonIconView className="icon_small">
                                View More
                            </ButtonIconView>
                        </Link>
                    </div>
                    <Movie
                        params={{ with_genres: 10762, page: 2 }}
                        category={cate.tv}
                        type={tvType.popular}
                    />
                </div>
            </div>
        </>
    );
};

export default Catalog;
