const variable = (state, action) => {
    switch (action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist],
            };
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    (movie) => movie.id !== action.payload
                ),
            };
        case "ADD_TV_TO_WATCHLIST":
            return {
                ...state,
                watchlistTv: [action.payload, ...state.watchlistTv],
            };
        case "REMOVE_TV_FROM_WATCHLIST":
            return {
                ...state,
                watchlistTv: state.watchlistTv.filter(
                    (tv) => tv.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default variable;
