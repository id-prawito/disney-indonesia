import React from "react";
import { useParams } from "react-router";
import { HeroChannels } from "../components/Hero";
import {
    ListDisney,
    ListMarvel,
    ListNational,
    ListPixar,
    ListStar,
} from "../components/ListCard";
import { category } from "../services/tmdbApi";
import disney from "../assets/images/disney_white.png";
import pixar from "../assets/images/pixar_white.png";
import marvel from "../assets/images/marvel_white.png";
import star from "../assets/images/star_white.png";
import national from "../assets/images/national_white.png";

const Card = () => {
    const { judul } = useParams();

    return (
        <>
            {judul === "disney" ? (
                <DisneyGrid />
            ) : judul === "pixar" ? (
                <PixarGrid />
            ) : judul === "marvel" ? (
                <MarvelGrid />
            ) : judul === "star-wars" ? (
                <StarGrid />
            ) : judul === "national" ? (
                <NationalGrid />
            ) : null}
        </>
    );
};

const DisneyGrid = () => {
    return (
        <>
            <HeroChannels
                params={{ pages: 1, with_companies: 2 }}
                category={category.movie}
                gambar={disney}
            />
            <div className="container_movie">
                <ListDisney />
            </div>
        </>
    );
};

const PixarGrid = () => {
    return (
        <>
            <HeroChannels
                params={{ pages: 1, with_companies: 3 }}
                category={category.movie}
                gambar={pixar}
            />
            <div className="container_movie">
                <ListPixar />
            </div>
        </>
    );
};

const MarvelGrid = () => {
    return (
        <>
            <HeroChannels
                params={{ pages: 1, with_companies: 420 }}
                category={category.movie}
                gambar={marvel}
            />
            <div className="container_movie">
                <ListMarvel />
            </div>
        </>
    );
};

const StarGrid = () => {
    return (
        <>
            <HeroChannels
                params={{ pages: 1, with_companies: 1 }}
                category={category.movie}
                gambar={star}
            />
            <div className="container_movie">
                <ListStar />
            </div>
        </>
    );
};

const NationalGrid = () => {
    return (
        <>
            <HeroChannels
                params={{ pages: 1, with_companies: 7521 }}
                category={category.movie}
                gambar={national}
            />
            <div className="container_movie">
                <ListNational />
            </div>
        </>
    );
};

export default Card;
