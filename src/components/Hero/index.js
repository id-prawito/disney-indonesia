import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category, tvType, movieType } from "../../services/tmdbApi";
import { FaCalendarDay, FaStar, FaRegClosedCaptioning } from "react-icons/fa";
import Modal, { ModalContent } from "../../components/Modal";
import image_not from "../../assets/images/not_found_ava.png";
import { ButtonIcon, ButtonIconTrailer } from "../../components/Button";
import apiConfig from "../../services/apiConfig";
import SwiperCore, { Autoplay } from "swiper";
import { useHistory } from "react-router";
import "./hero.scss";

const Hero = (props) => {
    const [movieItems, setMovieItems] = useState([]);
    SwiperCore.use([Autoplay]);

    useEffect(() => {
        const getMovies = async () => {
            const params = props.params;
            try {
                let response = null;
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(
                            movieType.popular,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                }

                let currentIndex = response.results.length,
                    randomIndex;
                while (currentIndex !== 0) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    // And swap it with the current element.
                    [
                        response.results[currentIndex],
                        response.results[randomIndex],
                    ] = [
                        response.results[randomIndex],
                        response.results[currentIndex],
                    ];
                }
                setMovieItems(response.results.slice(0, 4));
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, [props.params, props.category]);

    return (
        <div className="hero__slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 8000 }}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {props.category === "movie"
                            ? ({ isActive }) => (
                                  <HeroSlideItem
                                      item={item}
                                      className={`${isActive ? "active" : ""}`}
                                  />
                              )
                            : ({ isActive }) => (
                                  <HeroSlideItemTV
                                      item={item}
                                      className={`${isActive ? "active" : ""}`}
                                  />
                              )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
};

export const HeroChannels = (props) => {
    const [movieItems, setMovieItems] = useState([]);
    SwiperCore.use([Autoplay]);

    useEffect(() => {
        const getMovies = async () => {
            const params = props.params;
            try {
                let response = null;
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(
                            movieType.popular,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                }

                let currentIndex = response.results.length,
                    randomIndex;
                while (currentIndex !== 0) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    // And swap it with the current element.
                    [
                        response.results[currentIndex],
                        response.results[randomIndex],
                    ] = [
                        response.results[randomIndex],
                        response.results[currentIndex],
                    ];
                }
                setMovieItems(response.results.slice(0, 1));
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, [props.params, props.category]);

    return (
        <div className="hero__slide">
            {movieItems.map((item, i) => (
                <SwiperSlide key={i}>
                    {props.category === "movie"
                        ? ({ isActive }) => (
                              <HeroSlideItemChannels
                                  item={item}
                                  gambar={props.gambar}
                                  className={`${isActive ? "active" : ""}`}
                              />
                          )
                        : ({ isActive }) => (
                              <HeroSlideItemTV
                                  item={item}
                                  className={`${isActive ? "active" : ""}`}
                              />
                          )}
                </SwiperSlide>
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    let history = useHistory();
    const item = props.item;
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc =
                "https://www.youtube.com/embed/" + videos.results[0].key;
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML = "No trailer";
        }
        modal.classList.toggle("active");
    };

    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);
    useEffect(() => {
        const getImages = async () => {
            setloading(true);
            try {
                const response = await tmdbApi.getImages(
                    category.movie || category.tv,
                    item.id
                );
                for (let i = 0; i <= response.logos.length; i++) {
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
            } catch {}
            setloading(false);
        };
        getImages();
    }, [item.id, props.category]);

    const imagesLogo =
        apiConfig.w500Image(movieImages.logosnya) ||
        apiConfig.originalImage(movieImages.logosnya);

    return (
        <div
            className={`hero__slide-item ${props.className}`}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="hero__slide-item__content container">
                <div className="hero__slide-item__bungkus">
                    <div className="hero__slide-item_poster">
                        <img
                            style={{ borderRadius: "5px" }}
                            alt="poster_path"
                            src={apiConfig.w500Image(item.poster_path)}
                        />
                    </div>
                    <div className="hero__slide-item_info">
                        <div className="hero__slide-item_info-bungkus">
                            {movieImages.logosnya !== null ? (
                                <div className="images_title">
                                    {isLoading ? (
                                        <div className="text_loading">
                                            Loading...
                                        </div>
                                    ) : movieImages.logosnya === undefined ? (
                                        <img
                                            alt="not_available"
                                            src={image_not}
                                        />
                                    ) : (
                                        <img
                                            alt="poster_path"
                                            src={imagesLogo}
                                        />
                                    )}
                                </div>
                            ) : (
                                <img alt="not_available" src={image_not} />
                            )}
                            <div className="text_judul">
                                {item.title || item.name}
                            </div>
                            <div className="genre_item">
                                <div className="genre_item_item__content">
                                    <FaStar fontSize={14} />
                                    <div className="text_item">
                                        {item.vote_average}
                                    </div>
                                </div>
                                <div className="genre_item_item__content">
                                    <FaRegClosedCaptioning fontSize={16} />
                                    <div className="text_item">
                                        {item.original_language}
                                    </div>
                                </div>
                                <div className="genre_item_item__content">
                                    <FaCalendarDay />
                                    <div className="year">
                                        {item.release_date ||
                                            item.first_air_date}
                                    </div>
                                </div>
                            </div>
                            <div className="overview">{item.overview}</div>
                        </div>
                        <div className="btns">
                            <ButtonIcon
                                className="secondary_icon"
                                onClick={() =>
                                    history.push("/movie/" + item.id)
                                }
                            >
                                Watch Now
                            </ButtonIcon>
                            <ButtonIconTrailer
                                className="outline_icon"
                                onClick={setModalActive}
                            >
                                Watch Trailer
                            </ButtonIconTrailer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSlideItemTV = (props) => {
    let history = useHistory();

    const item = props.item;
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.tv, item.id);

        if (videos.results.length > 0) {
            const videSrc =
                "https://www.youtube.com/embed/" + videos.results[0].key;
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videSrc);
        } else {
            modal.querySelector(".modal__content > iframe").innerHTML =
                "No trailer";
        }
        modal.classList.toggle("active");
    };

    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        const getImages = async () => {
            setloading(true);
            try {
                const response = await tmdbApi.getImages(category.tv, item.id);
                for (let i = 0; i < response.logos.length - 1; i++) {
                    try {
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
                    } catch {
                        console.log("error");
                    }
                }
            } catch {
                console.log("error");
            }
            setloading(false);
        };
        getImages();
    }, [item.id, props.category]);

    const imagesLogo =
        apiConfig.w500Image(movieImages.logosnya) ||
        apiConfig.originalImage(movieImages.logosnya);

    return (
        <div
            className={`hero__slide-item ${props.className}`}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="hero__slide-item__content container">
                <div className="hero__slide-item__bungkus">
                    <div className="hero__slide-item_poster">
                        <img
                            alt="poster_path"
                            src={apiConfig.w500Image(item.poster_path)}
                        />
                    </div>
                    <div className="hero__slide-item_info">
                        <div className="hero__slide-item_info-bungkus">
                            <div className="images_title">
                                {isLoading ? (
                                    <div className="text_loading">
                                        Loading...
                                    </div>
                                ) : movieImages.logosnya === undefined ? (
                                    <img alt="not_available" src={image_not} />
                                ) : (
                                    <img alt="poster_path" src={imagesLogo} />
                                )}
                            </div>
                            <div className="genre_item">
                                <div className="genre_item_item__content">
                                    <FaStar fontSize={14} />
                                    <div className="text_item">
                                        {item.vote_average}
                                    </div>
                                </div>
                                <div className="genre_item_item__content">
                                    <FaRegClosedCaptioning fontSize={16} />
                                    <div className="text_item">
                                        {item.original_language}
                                    </div>
                                </div>
                                <div className="genre_item_item__content">
                                    <FaCalendarDay />
                                    <div className="year">
                                        {item.first_air_date}
                                    </div>
                                </div>
                            </div>
                            <div className="overview">{item.overview}</div>
                        </div>
                        <div className="btns">
                            <ButtonIcon
                                className="secondary_icon"
                                onClick={() => history.push("/tv/" + item.id)}
                            >
                                Watch Now
                            </ButtonIcon>
                            <ButtonIcon
                                className="outline_icon"
                                onClick={setModalActive}
                            >
                                Watch Trailer
                            </ButtonIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSlideItemChannels = (props) => {
    const item = props.item;
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    return (
        <div
            className={`hero__slide-item ${props.className}`}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="hero__slide-item__content container">
                <div
                    className="hero__slide-item__bungkus"
                    style={{ justifyContent: "center" }}
                >
                    <div className="images_title_channels">
                        <img alt="poster_path" src={props.gambar} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute("src", "");

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="520px"
                    title="trailer"
                    style={{ border: "none" }}
                    allowFullScreen
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default Hero;
