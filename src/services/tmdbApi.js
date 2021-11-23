import axiosClient from "./axiosClient";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    latest: "latest",
    now_playing: "now_playing",
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
    discover: "discover",
};

export const tvType = {
    latest: "latest",
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
    discover: "discover",
};

const tmdbApi = {
    // url = movie/popular/params
    getMoviesList: (type, params) => {
        const url = "movie/" + movieType[type];
        return axiosClient.get(url, params);
    },
    // url = tv/popular/params
    getTvList: (type, params) => {
        const url = "tv/" + tvType[type];
        return axiosClient.get(url, params);
    },
    // url = discover/movie/params
    getNewMovies: (type, params) => {
        const url = movieType[type] + "/movie";
        return axiosClient.get(url, params);
    },
    // url = discover/tv/params
    getNewTV: (type, params) => {
        const url = movieType[type] + "/tv";
        return axiosClient.get(url, params);
    },

    getDisneyList: (params) => {
        const url = "discover/tv/";
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    getImages: (cate, id) => {
        const url = category[cate] + "/" + id + "/images";
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = "search/" + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + "/" + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + "/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + "/" + id + "/similar";
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
