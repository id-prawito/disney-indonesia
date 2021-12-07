import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { useWindowScroll } from "react-use";

const Scroll = () => {
    const { y: pageYOffset } = useWindowScroll();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (pageYOffset > 900) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [pageYOffset]);

    if (!visible) {
        return true;
    }

    const toggleHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="button_scroll" onClick={toggleHome}>
                <FaAngleUp />
            </div>
        </>
    );
};
export default Scroll;
