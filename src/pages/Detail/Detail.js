import React, { useEffect, useRef, useState } from "react";
import { MovieRecomendations, MovieView } from "../../components/Movie";
import { ButtonIcon, ButtonIconLain } from "../../components/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import image_not from "../../assets/images/not_found_ava.png";
import Modal, { ModalContent } from "../../components/Modal";
import apiConfig from "../../services/apiConfig";
import tmdbApi from "../../services/tmdbApi";
import { FaLink } from "react-icons/fa";
import VideoList from "./VideoList";
import Episode from "./Episode";
import Cast from "./Cast";
import "./detail.scss";
import {
    FaRegClosedCaptioning,
    FaAudioDescription,
    FaStar,
} from "react-icons/fa";

const DetailScreen = () => {
    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setloading] = useState(true);
    const [item, setItem] = useState(null);
    const { category, id } = useParams();

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

    useEffect(() => {
        const getImages = async () => {
            setloading(true);
            try {
                const response = await tmdbApi.getImages(category, id);
                const gambar = response.logos.sort(
                    (a, b) => Number(b.vote_count) - Number(a.vote_count)
                );
                for (let i = 0; i < gambar.length; i++) {
                    if (gambar[i].iso_639_1 === "en") {
                        const Objectnya = {
                            logosnya: gambar[i].file_path,
                        };
                        setMovieImages(Objectnya);
                        break;
                    } else if (
                        gambar[i].iso_639_1 !== null ||
                        gambar[i].iso_639_1 === null
                    ) {
                        const Objectnya = {
                            logosnya: gambar[i].file_path,
                        };
                        setMovieImages(Objectnya);
                    } else {
                        break;
                    }
                }
            } catch {}
            setloading(false);
        };
        getImages();
    }, [id, category]);

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
                                                    <div className="text_loading">
                                                        Loading...
                                                    </div>
                                                ) : movieImages.logosnya ===
                                                  undefined ? (
                                                    <img
                                                        alt="not_available"
                                                        src={image_not}
                                                    />
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
                                                                item.release_date
                                                            } • ${Math.floor(
                                                                item.runtime /
                                                                    60
                                                            )} h : ${
                                                                item.runtime %
                                                                60
                                                            } min`}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {`${item.first_air_date} • ${item.number_of_seasons} Season : ${item.number_of_episodes} Episode`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="genre_list">
                                                {item.genres &&
                                                    item.genres
                                                        .slice(0, 5)
                                                        .map((genre, i) => (
                                                            <Link
                                                                key={i}
                                                                to={`/${category}/genres/${genre.id}`}
                                                            >
                                                                <span className="text_genres">
                                                                    {`${genre.name}, `}
                                                                </span>
                                                            </Link>
                                                        ))}
                                            </div>
                                            <div className="btns">
                                                <ButtonIcon
                                                    className="secondary_icon"
                                                    onClick={() =>
                                                        alert(
                                                            "Sorry, video not found, because this is just data form TMBD.\nYou can watch this video from Netflix or Disney+. :)"
                                                        )
                                                    }
                                                >
                                                    Watch Now
                                                </ButtonIcon>
                                                <ButtonIcon
                                                    className="outline_icon"
                                                    onClick={setModalActive}
                                                >
                                                    Watch Trailer
                                                </ButtonIcon>
                                                {item.homepage === "" ? null : (
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
                                                <Cast id={item.id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container_movie" style={{ gap: 30 }}>
                        <div className="card_list_movie">
                            {category === "movie" ? null : (
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
                        <div className="video_grid">
                            <VideoList id={item.id} />
                        </div>
                        <div className="card_list_movie">
                            <MovieView
                                type="similar"
                                judul="Similars"
                                params={{}}
                                category={category}
                                id={item.id}
                            />
                        </div>
                        <div className="card_list_movie">
                            <MovieRecomendations
                                type="recomendations"
                                judul="Recomendations"
                                params={{}}
                                category={category}
                                id={item.id}
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
                    style={{ border: "none" }}
                    ref={iframeRef}
                    title="trailer"
                    height="520px"
                    width="100%"
                    allowFullScreen
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default DetailScreen;
