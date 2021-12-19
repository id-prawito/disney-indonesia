import React from "react";
import logoNav from "../../assets/images/logoNav.svg";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <>
            <div className="footer__disney">
                <div className="footer__container">
                    <div className="footer__content">
                        <Link to="/" className="footer__logo">
                            <img
                                alt="logo_header"
                                src={logoNav}
                                className="logo__img"
                            />
                        </Link>
                    </div>
                    <div className="footer__content-media">
                        <a
                            href="https://www.hotstar.com"
                            target="_blank"
                            rel="noreferrer"
                            className="footer__content-social"
                        >
                            Disney +
                        </a>
                        <a
                            href="https://www.instagram.com/disneyplushotstar/"
                            target="_blank"
                            rel="noreferrer"
                            className="footer__content-social"
                        >
                            Instagram
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/DisneyPlusID"
                            className="footer__content-social"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://www.linkedin.com/company/the-walt-disney-company/"
                            target="_blank"
                            rel="noreferrer"
                            className="footer__content-social"
                        >
                            Linked In
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/DisneyPlusHotstarID"
                            className="footer__content-social"
                        >
                            Facebook
                        </a>
                    </div>
                    <div className="footer__content-disney">
                        <p>
                            Disney+ es un servicio por suscripción de pago, su
                            contenido está sujeto a disponibilidad. El servicio
                            Disney+ es comercializado por Disney DTC LATAM,
                            Inc., 2400 W Alameda AVE., Burbank CA 91521.
                        </p>
                    </div>
                    <div className="footer__content-copy">
                        <p>© Disney. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
