import { SwiperSlide, Swiper } from "swiper/react";
import React, { useEffect, useState } from "react";
import MovieCard, { TvCard } from "../../components/MovieCard";
import tmdbApi from "../../services/tmdbApi";

const CastList = (props) => {
    const id = props.id;
    const judul = props.judul;
    const [items, setItems] = useState([]);
    const [itemsTV, setItemsTV] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCastDetail = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.personMovie(id);
                const bisa = response.cast
                    .sort((a, b) => Number(b.popularity) - Number(a.popularity))
                    .slice(0, 40);
                setItems(bisa);
            } catch {
                console.log("error");
            }
            setLoading(false);
        };
        getCastDetail();
    }, [id]);

    useEffect(() => {
        const getCastDetail = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.personTV(id);
                const bisa = response.cast
                    .sort((a, b) => Number(b.popularity) - Number(a.popularity))
                    .slice(0, 20);
                setItemsTV(bisa);
            } catch {
                console.log("error");
            }
            setLoading(false);
        };
        getCastDetail();
    }, [id]);

    return (
        <div className="container_movie">
            {loading === true ? (
                <div className="card_list_movie">
                    <div className="judul_view_more">
                        <div className="judul">Loading ...</div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="card_list_movie">
                        <div className="judul_view_more">
                            <div className="judul">
                                Top {items.length} Movie from {judul}
                            </div>
                        </div>
                        <div className="movie-list">
                            <Swiper
                                grabCursor={true}
                                spaceBetween={20}
                                slidesPerView={8}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    // when window width is >= 480px
                                    481: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                    680: {
                                        slidesPerView: 5,
                                        spaceBetween: 10,
                                    },
                                    // when window width is >= 640px
                                    769: {
                                        slidesPerView: 6,
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        slidesPerView: 6,
                                        spaceBetween: 10,
                                    },
                                    1224: {
                                        slidesPerView: 8,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {items.slice(0, 1).map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieCard
                                            className="tambahan"
                                            key={i}
                                            item={item}
                                            category="movie"
                                        />
                                    </SwiperSlide>
                                ))}
                                {items
                                    .slice(1, items.length - 1)
                                    .map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <MovieCard
                                                key={i}
                                                item={item}
                                                category="movie"
                                            />
                                        </SwiperSlide>
                                    ))}
                                {items
                                    .slice(items.length - 1, items.length)
                                    .map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <MovieCard
                                                className="tambahan_kanan"
                                                key={i}
                                                item={item}
                                                category="movie"
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="card_list_movie">
                        <div className="judul_view_more">
                            <div className="judul">
                                Top {itemsTV.length} TV from {judul}
                            </div>
                        </div>
                        {itemsTV.length === 0 ? (
                            <div className="movie-card-not_found">
                                <h4>TV Not Found</h4>
                            </div>
                        ) : (
                            <div className="movie-list">
                                <Swiper
                                    grabCursor={true}
                                    spaceBetween={20}
                                    slidesPerView={8}
                                    breakpoints={{
                                        // when window width is >= 320px
                                        320: {
                                            slidesPerView: 3,
                                            spaceBetween: 10,
                                        },
                                        // when window width is >= 480px
                                        481: {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                        680: {
                                            slidesPerView: 5,
                                            spaceBetween: 10,
                                        },
                                        // when window width is >= 640px
                                        769: {
                                            slidesPerView: 6,
                                            spaceBetween: 10,
                                        },
                                        1024: {
                                            slidesPerView: 6,
                                            spaceBetween: 10,
                                        },
                                        1224: {
                                            slidesPerView: 8,
                                            spaceBetween: 20,
                                        },
                                    }}
                                >
                                    {itemsTV.slice(0, 1).map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <TvCard
                                                key={i}
                                                item={item}
                                                className="tambahan"
                                                category="tv"
                                            />
                                        </SwiperSlide>
                                    ))}
                                    {itemsTV
                                        .slice(1, items.length - 1)
                                        .map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <TvCard
                                                    key={i}
                                                    item={item}
                                                    className="card_slide"
                                                    category="tv"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    {itemsTV
                                        .slice(items.length - 1, items.length)
                                        .map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <TvCard
                                                    key={i}
                                                    item={item}
                                                    className="tambahan_kanan"
                                                    category="tv"
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CastList;
