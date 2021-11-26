import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import apiConfig from "../../services/apiConfig";
import { Link } from "react-router-dom";
import tmdbApi from "../../services/tmdbApi";
import Movie, { MovieRecomendations } from "../../components/Movie";
import Modal, { ModalContent } from "../../components/Modal";
import { FaLink } from "react-icons/fa";
import VideoList from "./VideoList";
import Cast from "./Cast";
import "./detail.scss";
import {
    FaAudioDescription,
    FaStar,
    FaRegClosedCaptioning,
} from "react-icons/fa";
import {
    ButtonIcon,
    ButtonIconLain,
    ButtonIconView,
} from "../../components/Button";
import Episode from "./Episode";

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

    // const imagesLogo =
    //     apiConfig.w500Image(movieImages.logosnya) ||
    //     apiConfig.originalImage(movieImages.logosnya);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${id}`);

        const videos = await tmdbApi.getVideos(category, id);

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
                            <TrailerModal item={item} />
                            <div className="screen_item__content container">
                                <div className="screen_item__bungkus">
                                    <div className="screen_item_info">
                                        <div className="screen_item_info-bungkus">
                                            <div className="images_title">
                                                {isLoading ? (
                                                    <h1>Loading</h1>
                                                ) : movieImages.logosnya ===
                                                  undefined ? (
                                                    <h4>
                                                        gambarnya tidak tersedia
                                                    </h4>
                                                ) : (
                                                    <img
                                                        alt="poster_path"
                                                        src={
                                                            apiConfig.w500Image(
                                                                movieImages.logosnya
                                                            ) ||
                                                            apiConfig.originalImage(
                                                                movieImages.logosnya
                                                            )
                                                        }
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
                                                    {category === "movie" ? (
                                                        <div className="text">
                                                            {`${
                                                                item.release_date ||
                                                                item.first_air_date
                                                            } • 
                                                    ${Math.floor(
                                                        item.runtime / 60
                                                    )} h `}
                                                            :
                                                            {` ${
                                                                item.runtime %
                                                                60
                                                            } min`}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {`${item.number_of_seasons} Season `}
                                                            :
                                                            {` ${item.number_of_episodes} Episode`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="genre_list">
                                                {item.genres &&
                                                    item.genres
                                                        .slice(0, 5)
                                                        .map((genre, i) => (
                                                            <span
                                                                key={i}
                                                                className="text_genres"
                                                            >
                                                                {genre.name},
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
                                                    onClick={setModalActive}
                                                >
                                                    Watch Trailer
                                                </ButtonIcon>

                                                {item.homepage === "" ? (
                                                    <></>
                                                ) : (
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={item.homepage}
                                                    >
                                                        <ButtonIconLain className="outline_icon">
                                                            <FaLink />
                                                        </ButtonIconLain>
                                                    </a>
                                                )}
                                            </div>
                                            <div className="overview">
                                                {item.overview}
                                            </div>
                                            <div className="container_cast">
                                                <div className="card_list_movie">
                                                    <div className="judul_view_more">
                                                        <div className="cast">
                                                            Cast
                                                        </div>
                                                    </div>
                                                    <Cast id={item.id} />
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
                            {category === "movie" ? (
                                <Movie
                                    category={category}
                                    type="similar"
                                    id={item.id}
                                    params={{}}
                                />
                            ) : (
                                <div className="coba_episode">
                                    <h3>TV Season and Episode</h3>

                                    <Episode
                                        id={item.id}
                                        number_of_seasons={
                                            item.number_of_seasons
                                        }
                                    ></Episode>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="container_movie">
                        <div className="video_grid">
                            <VideoList id={item.id} />
                        </div>
                    </div>
                    <div className="container_movie">
                        <div className="card_list_movie">
                            <div className="judul_view_more">
                                <h3>Similars</h3>
                                <Link to="/movie">
                                    <ButtonIconView className="icon_small">
                                        View More
                                    </ButtonIconView>
                                </Link>
                            </div>
                            <Movie
                                category={category}
                                type="similar"
                                id={item.id}
                                params={{}}
                            />
                        </div>
                    </div>
                    <div className="container_movie">
                        <div className="card_list_movie">
                            <div className="judul_view_more">
                                <h3>Recomendations</h3>
                                <Link to="/movie">
                                    <ButtonIconView className="icon_small">
                                        View More
                                    </ButtonIconView>
                                </Link>
                            </div>
                            <MovieRecomendations
                                category={category}
                                type="recomendations"
                                id={item.id}
                                params={{}}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute("src", "");

    return (
        <Modal id={`modal_${item.id}`}>
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

export default DetailScreen;
