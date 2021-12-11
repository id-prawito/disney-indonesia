import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import apiConfig from "../../services/apiConfig";
import SwiperCore, { Autoplay } from "swiper";
import tmdbApi from "../../services/tmdbApi";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import nothing from "../../assets/images/images_not-found.png";
import "./detail.scss";

const Cast = (props) => {
    const { category } = useParams();
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id);
            setCasts(res.cast.slice(0, 15));
        };
        getCredits();
    }, [category, props.id]);

    SwiperCore.use([Autoplay]);

    return (
        <div className="card_list_movie" style={{ gap: 10 }}>
            <div className="cast">Cast</div>
            {casts.length === 0 ? (
                <div className="cast-not_found">
                    <div className="text">Cast Not Found</div>
                </div>
            ) : (
                <div className="cast_list">
                    <Swiper
                        autoplay={{ delay: 5000 }}
                        modules={[Autoplay]}
                        grabCursor={true}
                        spaceBetween={14}
                        slidesPerView={8}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 4,
                                spaceBetween: 14,
                            },
                            // when window width is >= 480px
                            480: {
                                slidesPerView: 6,
                                spaceBetween: 10,
                            },
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 8,
                                spaceBetween: 14,
                            },
                        }}
                    >
                        {casts.slice(0, 1).map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="cast__movie tambahan_cast">
                                    {item.profile_path === null ? (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={nothing}
                                                alt="image_not-found"
                                            />
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={`${apiConfig.w500Image(
                                                    item.profile_path
                                                )}`}
                                                alt="aa"
                                            />
                                        </Link>
                                    )}
                                    <div className="text_cats">{item.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                        {casts.slice(1, casts.length - 1).map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="cast__movie card-slide">
                                    {item.profile_path === null ? (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={nothing}
                                                alt="image_not-found"
                                            />
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={`${apiConfig.w500Image(
                                                    item.profile_path
                                                )}`}
                                                alt="aa"
                                            />
                                        </Link>
                                    )}
                                    <div className="text_cats">{item.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                        {casts.slice(casts.length - 1).map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="cast__movie tambahan_cast_kanan">
                                    {item.profile_path === null ? (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={nothing}
                                                alt="image_not-found"
                                            />
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/${category}/person/${item.id}`}
                                        >
                                            <img
                                                src={`${apiConfig.w500Image(
                                                    item.profile_path
                                                )}`}
                                                alt="aa"
                                            />
                                        </Link>
                                    )}
                                    <div className="text_cats">{item.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Cast;
