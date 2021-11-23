import React from "react";
import disney from "../../assets/images/viewers-disney.png";
import pixar from "../../assets/images/viewers-pixar.png";
import marvel from "../../assets/images/viewers-marvel.png";
import star_wars from "../../assets/images/viewers-starwars.png";
import national from "../../assets/images/viewers-national.png";
import disney_video from "../../assets/videos/1564674844-disney.mp4";
import pixar_video from "../../assets/videos/1564676714-pixar.mp4";
import marvel_video from "../../assets/videos/1564676115-marvel.mp4";
import star_wars_video from "../../assets/videos/1608229455-star-wars.mp4";
import national_video from "../../assets/videos/1564676296-national-geographic.mp4";
import "./card_disney.scss";

const CardDisney = () => {
    return (
        <div className="container">
            <div className="card_disney">
                <div className="card_disney_item">
                    <img src={disney} alt="disney" />
                    <video autoPlay preload="auto" muted loop playsInline>
                        <source src={disney_video} type="video/mp4" />
                    </video>
                </div>
                <div className="card_disney_item">
                    <img src={pixar} alt="disney" />
                    <video
                        autoPlay
                        preload="auto"
                        muted
                        loop
                        playsInline
                        alt="disney"
                    >
                        <source src={pixar_video} type="video/mp4" />
                    </video>
                </div>
                <div className="card_disney_item">
                    <img src={marvel} alt="disney" />
                    <video autoPlay preload="auto" muted loop playsInline>
                        <source src={marvel_video} type="video/mp4" />
                    </video>
                </div>
                <div className="card_disney_item">
                    <img src={star_wars} alt="disney" />
                    <video autoPlay preload="auto" muted loop playsInline>
                        <source src={star_wars_video} type="video/mp4" />
                    </video>
                </div>
                <div className="card_disney_item">
                    <img src={national} alt="disney" />
                    <video autoPlay preload="auto" muted loop playsInline>
                        <source src={national_video} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default CardDisney;
