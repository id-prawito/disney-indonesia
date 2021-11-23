import React, { useEffect, useState, useRef } from "react";
import tmdbApi, { category, movieType } from "../../services/tmdbApi";
import apiConfig from "../../services/apiConfig";
import Modal, { ModalContent } from "../../components/Modal";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero.scss";
import { useHistory } from "react-router";
import { ButtonIcon } from "../../components/Button";

const Hero = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(
                    movieType.popular,
                    { params }
                );
                setMovieItems(response.results.slice(0, 4));
                // console.log(response);
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero__slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{ delay: 5000 }}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem
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

    useEffect(() => {
        const getImages = async () => {
            try {
                const response = await tmdbApi.getImages(
                    category.movie,
                    item.id
                );

                for (let i = 0; i < response.logos.length - 1; i++) {
                    if (response.logos[i].iso_639_1 === "en") {
                        const Objectnya = {
                            logosnya: response.logos[i].file_path,
                        };
                        // console.log(Objectnya);
                        setMovieImages(Objectnya);
                        break;
                    }
                }
            } catch {
                console.log("error");
            }
        };
        getImages();
    }, [item.id]);

    const imagesLogo = apiConfig.w500Image(movieImages.logosnya);

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
                                <img alt="poster_path" src={imagesLogo} />
                            </div>
                            <div className="genre">
                                <div className="genre_item__content">
                                    <h2 className="genre_item__content_p">
                                        Release Data :
                                        <p className="genre_item__content_p_text">
                                            {item.release_date}
                                        </p>
                                    </h2>
                                </div>
                                <div className="genre_item__content">
                                    <h2 className="genre_item__content_p">
                                        Popularity :
                                        <p className="genre_item__content_p_text">
                                            {item.popularity}
                                        </p>
                                    </h2>
                                </div>
                                <div className="genre_item__content">
                                    <h2 className="genre_item__content_p">
                                        Vote Average :
                                        <p className="genre_item__content_p_text">
                                            {item.vote_average}
                                        </p>
                                    </h2>
                                </div>
                            </div>
                            <div className="overview">{item.overview}</div>
                        </div>
                        <div className="btns">
                            <ButtonIcon
                                className="secondary_icon"
                                onClick={() => history.push("/movie" + item.id)}
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
