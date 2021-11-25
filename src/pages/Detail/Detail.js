import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiConfig from "../../services/apiConfig";
import tmdbApi, { category as cate, movieType } from "../../services/tmdbApi";
import {
    FaAudioDescription,
    FaStar,
    FaRegClosedCaptioning,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./detail.scss";
import {
    ButtonIcon,
    ButtonIconLain,
    ButtonIconView,
} from "../../components/Button";
import Movie from "../../components/Movie";
import { FaLink } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
const DetailScreen = () => {
    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        const getDetail = async () => {
            setloading(true);
            try {
                const response = await tmdbApi.detail(category, id, {
                    params: {},
                });
                setItem(response);
                window.scrollTo(0, 0);
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getDetail();
    }, [category, id]);

    // const d = new Date(item.release_date);
    // const year = d.getFullYear();
    // console.log(year);

    const [movieImages, setMovieImages] = useState([]);
    useEffect(() => {
        const getImages = async () => {
            setloading(true);
            try {
                const response = await tmdbApi.getImages(category, id);
                for (let i = 0; i < response.logos.length - 1; i++) {
                    if (
                        response.logos[i].iso_639_1 === "en" ||
                        response.logos[i].iso_639_1 === null ||
                        response.logos[i].iso_639_1 === undefined
                    ) {
                        const Objectnya = {
                            logosnya: response.logos[i].file_path,
                        };
                        setMovieImages(Objectnya);
                        break;
                    }
                }
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getImages();
    }, [id, category]);

    const imagesLogo =
        apiConfig.w500Image(movieImages.logosnya) ||
        apiConfig.originalImage(movieImages.logosnya);

    return (
        <>
            {item && (
                <>
                    <div className="detail_screen">
                        <div
                            className="screen_item"
                            style={{
                                backgroundImage: `url(${apiConfig.originalImage(
                                    item.backdrop_path || item.poster_path
                                )})`,
                            }}
                        >
                            <div className="screen_item__content container">
                                <div className="screen_item__bungkus">
                                    <div className="screen_item_info">
                                        <div className="screen_item_info-bungkus">
                                            <div className="images_title">
                                                {isLoading ? (
                                                    <h1>Loading</h1>
                                                ) : (
                                                    <img
                                                        alt="poster_path"
                                                        src={imagesLogo}
                                                    />
                                                )}
                                            </div>

                                            <div className="genre_item">
                                                <div className="genre_item_item__content">
                                                    <FaAudioDescription
                                                        fontSize={16}
                                                    />
                                                    {
                                                        item.spoken_languages[0]
                                                            .iso_639_1
                                                    }
                                                </div>
                                                <div className="genre_item_item__content">
                                                    <FaStar fontSize={14} />
                                                    {item.vote_average}
                                                </div>
                                                <div className="genre_item_item__content">
                                                    <FaRegClosedCaptioning
                                                        fontSize={16}
                                                    />
                                                    {item.original_language}
                                                </div>
                                                <div className="year">
                                                    {`${
                                                        item.release_date
                                                    } • ${Math.floor(
                                                        item.runtime / 60
                                                    )} h `}
                                                    :
                                                    {` ${
                                                        item.runtime % 60
                                                    } min`}
                                                </div>
                                            </div>
                                            <div className="genre_list">
                                                {item.genres &&
                                                    item.genres
                                                        .slice(0, 5)
                                                        .map((genre, i) => (
                                                            <span
                                                                key={i}
                                                                className="genres__item"
                                                            >
                                                                {genre.name}
                                                            </span>
                                                        ))}
                                            </div>
                                            <div className="btns">
                                                <ButtonIcon
                                                    className="secondary_icon"
                                                    // onClick={() =>
                                                    //     history.push(
                                                    //         "/movie" + item.id
                                                    //     )
                                                    // }
                                                >
                                                    Watch Now
                                                </ButtonIcon>
                                                <ButtonIcon
                                                    className="outline_icon"
                                                    // onClick={setModalActive}
                                                >
                                                    Watch Trailer
                                                </ButtonIcon>
                                                <ButtonIconLain
                                                    className="outline_icon"
                                                    // onClick={setModalActive}
                                                >
                                                    <FaLink />
                                                </ButtonIconLain>
                                            </div>
                                            <div className="overview">
                                                {item.overview}
                                            </div>
                                            <div className="card_list_movie">
                                                <div className="judul_view_more">
                                                    <div className="cast">
                                                        Cast
                                                    </div>
                                                </div>
                                                <div className="cast_list">
                                                    <Swiper
                                                        grabCursor={true}
                                                        spaceBetween={20}
                                                        slidesPerView={5}
                                                    >
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="card_movie">
                                                                Hello
                                                            </div>
                                                        </SwiperSlide>
                                                    </Swiper>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    </div>
                </>
            )}
        </>
    );
};

export default DetailScreen;
