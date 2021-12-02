import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    watchlist: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
    watchlistTv: localStorage.getItem("watchlistTv")
        ? JSON.parse(localStorage.getItem("watchlistTv"))
        : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watchlistTv", JSON.stringify(state.watchlistTv));
    }, [state]);

    const addMovieToWatchlist = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    const removeMovieFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
    };

    const addTvToWatchlist = (tv) => {
        dispatch({ type: "ADD_TV_TO_WATCHLIST", payload: tv });
    };

    const removeTvFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_TV_FROM_WATCHLIST", payload: id });
    };

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watchlistTv: state.watchlistTv,
                addMovieToWatchlist,
                removeMovieFromWatchlist,
                addTvToWatchlist,
                removeTvFromWatchlist,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
