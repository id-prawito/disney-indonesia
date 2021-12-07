import React from "react";
import national_video from "../../assets/videos/1564676296-national-geographic.mp4";
import star_wars_video from "../../assets/videos/1608229455-star-wars.mp4";
import marvel_video from "../../assets/videos/1564676115-marvel.mp4";
import disney_video from "../../assets/videos/1564674844-disney.mp4";
import pixar_video from "../../assets/videos/1564676714-pixar.mp4";
import star_wars from "../../assets/images/viewers-starwars.png";
import national from "../../assets/images/viewers-national.png";
import disney from "../../assets/images/viewers-disney.png";
import marvel from "../../assets/images/viewers-marvel.png";
import pixar from "../../assets/images/viewers-pixar.png";
import "./card_disney.scss";
import { Link } from "react-router-dom";

const CardDisney = () => {
    return (
        <div className="container">
            <div className="card_disney">
                <Link to="/channels/card/disney">
                    <div className="card_disney_item">
                        <img src={disney} alt="disney" />
                        <video autoPlay preload="auto" muted loop playsInline>
                            <source src={disney_video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
                <Link to="/channels/card/pixar">
                    <div className="card_disney_item">
                        <img src={pixar} alt="disney" />
                        <video autoPlay preload="auto" muted loop playsInline>
                            <source src={pixar_video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
                <Link to="/channels/card/marvel">
                    <div className="card_disney_item">
                        <img src={marvel} alt="disney" />
                        <video autoPlay preload="auto" muted loop playsInline>
                            <source src={marvel_video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
                <Link to="/channels/card/star-wars">
                    <div className="card_disney_item">
                        <img src={star_wars} alt="disney" />
                        <video autoPlay preload="auto" muted loop playsInline>
                            <source src={star_wars_video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
                <Link to="/channels/card/national">
                    <div className="card_disney_item">
                        <img src={national} alt="disney" />
                        <video autoPlay preload="auto" muted loop playsInline>
                            <source src={national_video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardDisney;
