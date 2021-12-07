import React, { useContext } from "react";
import { MovieCardGrid, TvCardGrid } from "../components/MovieCard";
import { GlobalContext } from "../config/GlobalState";

const Watchlist = () => {
    const { watchlist, watchlistTv } = useContext(GlobalContext);
    window.scrollTo(0, 0);

    return (
        <>
            <div className="container_movie" style={{ gap: 20 }}>
                <div className="pembungkus">
                    <h4>Watchlist Movie</h4>
                    <div className="class_genres">
                        {watchlist.map((item, i) => (
                            <MovieCardGrid
                                key={i}
                                className="card_slide"
                                item={item}
                                category="movie"
                            />
                        ))}
                    </div>
                </div>
                <div className="pembungkus">
                    <h4>Watchlist TV</h4>
                    <div className="class_genres">
                        {watchlistTv.map((item, i) => (
                            <TvCardGrid
                                key={i}
                                className="card_slide"
                                item={item}
                                category="tv"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Watchlist;
