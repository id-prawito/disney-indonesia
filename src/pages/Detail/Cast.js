import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../services/tmdbApi";
import apiConfig from "../../services/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
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
        <>
            <div className="cast_list">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 1000 }}
                    grabCursor={true}
                    spaceBetween={14}
                    slidesPerView={8}
                >
                    {casts.slice(0, 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={`cast__movie tambahan_cast`}>
                                {item.profile_path === null ? (
                                    <div className="text_cats">
                                        Gambar tidak ada
                                    </div>
                                ) : (
                                    <img
                                        src={`${apiConfig.w500Image(
                                            item.profile_path
                                        )}`}
                                        alt="aa"
                                    />
                                )}
                                <div className="text_cats">{item.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                    {casts.slice(1, casts.length - 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={`cast__movie card-slide`}>
                                {item.profile_path === null ? (
                                    <div className="text_cats">
                                        Gambar tidak ada
                                    </div>
                                ) : (
                                    <img
                                        src={`${apiConfig.w500Image(
                                            item.profile_path
                                        )}`}
                                        alt="aa"
                                    />
                                )}
                                <div className="text_cats">{item.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                    {casts.slice(casts.length - 1).map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={`cast__movie tambahan_cast_kanan`}>
                                {item.profile_path === null ? (
                                    <div className="text_cats">
                                        Gambar tidak ada
                                    </div>
                                ) : (
                                    <img
                                        src={`${apiConfig.w500Image(
                                            item.profile_path
                                        )}`}
                                        alt="aa"
                                    />
                                )}
                                <div className="text_cats">{item.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Cast;
