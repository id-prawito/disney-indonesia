import React, { useCallback, useEffect, useState } from "react";
import { ListMovie, ListTV } from "../components/ListCard";
import { category as cate } from "../services/tmdbApi";
import { useHistory, useParams } from "react-router";
import { ButtonIcon } from "../components/Button";
import Input from "../components/Input";
import Hero from "../components/Hero";
import Watchlist from "./Watchlist";
import "./Detail/detail.scss";
import apiConfig from "../services/apiConfig";
import { Link } from "react-router-dom";

const Catalog = () => {
    const { category } = useParams();

    return (
        <>
            {category === cate.movie ? (
                <MovieGrid />
            ) : category === cate.tv ? (
                <TvGrid />
            ) : category === "genres" ? (
                <Genres />
            ) : category === "watchlist" ? (
                <WatchlistList />
            ) : null}
        </>
    );
};

const MovieGrid = () => {
    const { keyword, category } = useParams();

    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.movie}
            />
            <div className="container_movie">
                <MovieSearch category={category} keyword={keyword} />
                <ListMovie />
            </div>
        </>
    );
};

const TvGrid = () => {
    const { keyword, category } = useParams();

    return (
        <>
            <Hero
                params={{ pages: 1, with_companies: 420 }}
                category={cate.tv}
            />
            <div className="container_movie">
                <MovieSearch category={category} keyword={keyword} />
                <ListTV />
            </div>
        </>
    );
};

const MovieSearch = (props) => {
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
    const history = useHistory();
    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push(`/${cate[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener("keyup", enterEvent);
        return () => {
            document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <ButtonIcon className="icon" onClick={goToSearch}>
                Search
            </ButtonIcon>
        </div>
    );
};

const Genres = () => {
    const data = [
        {
            file_path: "/vIPIyTJqcgOKgKcExCvTDpLpTYW.jpg",
            judul: "Action",
            id_genres: 28,
            name: "action",
        },
        {
            file_path: "/7WJjFviFBffEJvkAms4uWwbcVUk.jpg",
            judul: "Adventure",
            id_genres: 12,
            name: "adventure",
        },
        {
            file_path: "/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg",
            judul: "Animation",
            id_genres: 16,
            name: "animation",
        },
        {
            file_path: "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
            judul: "Comedy",
            id_genres: 35,
            name: "comedy",
        },
        {
            file_path: "/eBGKU0ZLJmxtVtzESTB1mfllX1J.jpg",
            judul: "Crime",
            id_genres: 80,
            name: "crime",
        },
        {
            file_path: "/QbcdvIZMZImxiKH7dl4xKhT86B.jpg",
            judul: "Documentary",
            id_genres: 99,
            name: "documentary",
        },
        {
            file_path: "/oE6bhqqVFyIECtBzqIuvh6JdaB5.jpg",
            judul: "Drama",
            id_genres: 18,
            name: "drama",
        },
        {
            file_path: "/1uHTuwx5h9T3XzsXijMMKybDFvZ.jpg",
            judul: "Family",
            id_genres: 10751,
            name: "family",
        },
        {
            file_path: "/jlQJDD0L5ZojjlS0KYnApdO0n19.jpg",
            judul: "Fantasy",
            id_genres: 14,
            name: "fantasy",
        },
        {
            file_path: "/zv1xOEQzebKyku349qDZ085FZlO.jpg",
            judul: "History",
            id_genres: 36,
            name: "history",
        },
        {
            file_path: "/bwPXMrDyPDaSiQaOmUo10GLn0rf.jpg",
            judul: "Horor",
            id_genres: 27,
            name: "horor",
        },
        {
            file_path: "/xnMri59lUPT8069oSEj8ak3hcyC.jpg",
            judul: "Music",
            id_genres: 10402,
            name: "music",
        },
        {
            file_path: "/bsaA9qtIR6VTDQykXdBzJc8V5rS.jpg",
            judul: "Mystery",
            id_genres: 9648,
            name: "mystery",
        },
        {
            file_path: "/lV3UFPPxDIPelh46G9oySXN9Mcz.jpg",
            judul: "Romance",
            id_genres: 10749,
            name: "romance",
        },
        {
            file_path: "/4gKxQIW91hOTELjY5lzjMbLoGxB.jpg",
            judul: "Science Fiction",
            id_genres: 878,
            name: "sci-fi",
        },
        {
            file_path: "/lkeBhXGJFRlhI7cBWn8LQQAdZqK.jpg",
            judul: "TV Movie",
            id_genres: 10770,
            name: "tv-movie",
        },
        {
            file_path: "/icOUc1llxf2GJr1Z4dBbJYLzuvw.jpg",
            judul: "Thriller",
            id_genres: 53,
            name: "thriller",
        },
        {
            file_path: "/1uKHoFWyYJn060dpIXUCU7Wbc15.jpg",
            judul: "War",
            id_genres: 10752,
            name: "war",
        },
        {
            file_path: "/fQlfObqEH8Jam5WQrLUMngbEroZ.jpg",
            judul: "Western",
            id_genres: 37,
            name: "western",
        },
    ];

    const datatv = [
        {
            file_path: "/1R68vl3d5s86JsS2NPjl8UoMqIS.jpg",
            id: 10759,
            name: "Action & Adventure",
        },
        {
            file_path: "/hndATj4ErEQbO796kvjyiOvSNBL.jpg",
            id: 16,
            name: "Animation",
        },
        {
            file_path: "/uyilhJ7MBLjiaQXboaEwe44Z0jA.jpg",
            id: 35,
            name: "Comedy",
        },
        {
            file_path: "/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
            id: 80,
            name: "Crime",
        },
        {
            file_path: "/yjBEqByxh3sw4ixqoXxYB2VNyru.jpg",
            id: 99,
            name: "Documentary",
        },
        {
            file_path: "/gUOkdbnVOVGrkOa6DHB8CEZgtVg.jpg",
            id: 18,
            name: "Drama",
        },
        {
            file_path: "/o4NtyNg8jnauQ893tulS3nSwQrD.jpg",
            id: 10751,
            name: "Family",
        },
        {
            file_path: "/tEP8f7xGdhbGF3vfIQIfjnP0uZv.jpg",
            id: 10762,
            name: "Kids",
        },
        {
            file_path: "/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
            id: 9648,
            name: "Mystery",
        },
        {
            file_path: "/dasgPx3OgkxHSQyncKlApfZkpi2.jpg",
            id: 10763,
            name: "News",
        },
        {
            file_path: "/rHuXgDmrv4vMKgQZ6pu2E2iLJnM.jpg",
            id: 10764,
            name: "Reality",
        },
        {
            file_path: "/1P3QtW1IkivqDrKbbwuR0zCYIf8.jpg",
            id: 10765,
            name: "Sci-Fi & Fantasy",
        },
        {
            file_path: "/5ie8dU1MBhHP5I2t54YqWdttbsb.jpg",
            id: 10766,
            name: "Soap",
        },
        {
            file_path: "/6jGVOu5NvnmSKh28ByWAJrTOEH2.jpg",
            id: 10767,
            name: "Talk",
        },
        {
            file_path: "/6lOtF3yx8iurvaBVz1ZVhwcRgmD.jpg",
            id: 10768,
            name: "War & Politics",
        },
        {
            file_path: "/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
            id: 37,
            name: "Western",
        },
    ];

    return (
        <div className="container_movie">
            <div className="pembungkus">
                <div className="bungkus">
                    <div className="judul_genres">Movie Genres</div>
                    <div className="genres_item-card">
                        {data.map((item, i) => (
                            <Link
                                key={i}
                                to={`/movie/genres/${item.id_genres}`}
                            >
                                <div className="card_genres">
                                    <img
                                        src={apiConfig.w500Image(
                                            item.file_path
                                        )}
                                        alt="disney"
                                    />
                                    <div className="text_genres">
                                        {item.judul}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="bungkus">
                    <div className="judul_genres">TV Genres</div>
                    <div className="genres_item-card">
                        {datatv.map((item, i) => (
                            <Link key={i} to={`/tv/genres/${item.id}`}>
                                <div className="card_genres">
                                    <img
                                        src={apiConfig.w500Image(
                                            item.file_path
                                        )}
                                        alt="disney"
                                    />
                                    <div className="text_genres">
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const WatchlistList = () => {
    return <Watchlist />;
};

export default Catalog;
