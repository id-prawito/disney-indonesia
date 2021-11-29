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
                        <Link to="#" className="footer__content-social">
                            Disney +
                        </Link>
                        <Link to="#" className="footer__content-social">
                            Instagram
                        </Link>
                        <Link to="#" className="footer__content-social">
                            Twitter
                        </Link>
                        <Link to="#" className="footer__content-social">
                            Linked In
                        </Link>
                        <Link to="#" className="footer__content-social">
                            Facebook
                        </Link>
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
