import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
import MovieCard, { TvCard } from "../../components/MovieCard";
import tmdbApi from "../../services/tmdbApi";
import { SwiperSlide, Swiper } from "swiper/react";

const CastList = (props) => {
    const id = props.id;
    // const { category } = useParams();
    const judul = props.judul;
    const [items, setItems] = useState([]);
    const [itemsTV, setItemsTV] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    // const [totalPage, setTotalPage] = useState(0);

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

    // console.log(items);
    // console.log(loading);
    return (
        <>
            {loading === true ? (
                <div className="judul_view_more">
                    <h3>Loading..</h3>
                </div>
            ) : (
                <>
                    <div className="container_movie">
                        <div className="card_list_movie">
                            <div className="judul_view_more">
                                <h3>
                                    Top {items.length} Movie from {judul}
                                </h3>
                            </div>

                            <div className="movie-list">
                                <Swiper
                                    grabCursor={true}
                                    spaceBetween={20}
                                    slidesPerView={8}
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
                    </div>

                    <div className="container_movie">
                        <div className="card_list_movie">
                            <div className="judul_view_more">
                                <h3>
                                    Top {itemsTV.length} TV from {judul}
                                </h3>
                            </div>

                            <div className="movie-list">
                                <Swiper
                                    grabCursor={true}
                                    spaceBetween={20}
                                    slidesPerView={8}
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
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CastList;
