import React, { useEffect, useState } from "react";
import nothing from "../../assets/images/images_not-found.png";
import { useParams } from "react-router";
import apiConfig from "../../services/apiConfig";
import tmdbApi from "../../services/tmdbApi";
import CastList from "./CastList";

import {
    FaTwitter,
    FaFacebookF,
    FaBirthdayCake,
    FaVenusMars,
    FaLink,
    FaInstagram,
    FaImdb,
} from "react-icons/fa";

const CastDetail = () => {
    const { id } = useParams();
    const [cast, setCast] = useState([]);
    const [detail, setDetail] = useState([]);
    window.scrollTo(0, 0);
    useEffect(() => {
        const getCastDetail = async () => {
            try {
                const response = await tmdbApi.person(id);
                setCast(response);
            } catch {
                console.log("error");
            }
        };
        getCastDetail();
    }, [id]);

    useEffect(() => {
        const getCastDetail = async () => {
            try {
                const response = await tmdbApi.personIDS(id);
                setDetail(response);
            } catch {
                console.log("error");
            }
        };
        getCastDetail();
    }, [id]);

    const data = { ...cast, ...detail };

    const d = new Date(data.birthday);
    const umur = new Date().getFullYear() - d.getFullYear();

    const gambar =
        apiConfig.originalImage(data.profile_path) ||
        apiConfig.w500Image(data.profile_path);

    return (
        <>
            {data && (
                <>
                    <div className="container_movie" style={{ gap: 30 }}>
                        <div className="castnya__bungkus">
                            <div className="castnya__detail">
                                {data.profile_path === null ? (
                                    <img src={nothing} alt="image_not-found" />
                                ) : (
                                    <img
                                        style={{ borderRadius: "5px" }}
                                        alt="poster_path"
                                        src={gambar}
                                    />
                                )}
                            </div>
                            <div className="castnya__info">
                                <div className="info">
                                    <div className="info_nama">{data.name}</div>
                                    <div className="genre_item">
                                        <div className="genre_item_item__content">
                                            <FaBirthdayCake fontSize={14} />
                                            {data.place_of_birth !== null &&
                                            data.birthday !== null ? (
                                                <div className="text_item">
                                                    {`${data.place_of_birth}, ${data.birthday} (${umur} years old)`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="genre_item_item__content_gen">
                                            <FaVenusMars fontSize={16} />
                                            <div className="text_item">
                                                {data.gender === 1
                                                    ? "Female"
                                                    : "Male"}
                                            </div>
                                        </div>
                                    </div>

                                    {data.biography === null ||
                                    data.biography === "" ? (
                                        <div className="overviewnya">
                                            This person not have a description
                                            detail in this TMDB data.
                                        </div>
                                    ) : (
                                        <div className="overviewnya">
                                            {data.biography}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="castnya__info">
                                <div className="info">
                                    <div className="info_nama">
                                        Person Detail
                                    </div>
                                    {data.facebook_id === null &&
                                    data.twitter_id === null &&
                                    data.instagram_id === null &&
                                    data.homepage === null &&
                                    data.imdb_id === null ? (
                                        <h4>dont have social media</h4>
                                    ) : (
                                        <div className="genre_item_media">
                                            {data.facebook_id !== null ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://www.facebook.com/${data.facebook_id}`}
                                                >
                                                    <div className="genre_item_media_item__content">
                                                        <FaFacebookF
                                                            fontSize={14}
                                                        />
                                                    </div>
                                                </a>
                                            ) : null}

                                            {data.twitter_id !== null ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://twitter.com/${data.twitter_id}`}
                                                >
                                                    <div className="genre_item_media_item__content">
                                                        <FaTwitter
                                                            fontSize={16}
                                                        />
                                                    </div>
                                                </a>
                                            ) : null}

                                            {data.instagram_id !== null ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://instagram.com/${data.instagram_id}/`}
                                                >
                                                    <div className="genre_item_media_item__content">
                                                        <FaInstagram
                                                            fontSize={16}
                                                        />
                                                    </div>
                                                </a>
                                            ) : null}
                                            {data.homepage !== null ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={data.homepage}
                                                >
                                                    <div className="genre_item_media_item__content">
                                                        <FaLink fontSize={16} />
                                                    </div>
                                                </a>
                                            ) : null}
                                            {data.imdb_id !== null ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://www.imdb.com/name/${data.imdb_id}/`}
                                                >
                                                    <div className="genre_item_media_item__content">
                                                        <FaImdb fontSize={16} />
                                                    </div>
                                                </a>
                                            ) : null}
                                        </div>
                                    )}

                                    <div className="overviewnya">
                                        <h4>Known For</h4>
                                        {data.known_for_department}
                                    </div>
                                    <div className="overviewnya">
                                        <h4>Also Know as</h4>
                                        {data.also_known_as &&
                                            data.also_known_as.map(
                                                (item, i) => (
                                                    <span
                                                        key={i}
                                                        className="text_genres"
                                                    >
                                                        {`${item} | `}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data.id === undefined ? (
                        <h4>Loading....</h4>
                    ) : (
                        <CastList judul={data.name} id={data.id} />
                    )}
                </>
            )}
        </>
    );
};

export default CastDetail;
