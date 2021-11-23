const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "dce2d8d192b3d59247d3c7216a0dbc4a",
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
