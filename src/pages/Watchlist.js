import React, { useContext } from "react";
import MovieCard, { TvCard } from "../components/MovieCard";
import { GlobalContext } from "../config/GlobalState";

const Watchlist = () => {
    const { watchlist, watchlistTv } = useContext(GlobalContext);
    window.scrollTo(0, 0);

    return (
        <>
            <div className="container_movie">
                <div className="class_genres">
                    {watchlist.map((item, i) => (
                        <MovieCard
                            key={i}
                            className="card_slide"
                            item={item}
                            category="movie"
                        />
                    ))}
                </div>
                <div className="class_genres">
                    {watchlistTv.map((item, i) => (
                        <TvCard
                            key={i}
                            className="card_slide"
                            item={item}
                            category="tv"
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Watchlist;
