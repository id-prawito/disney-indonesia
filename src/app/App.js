import "./App.scss";
import "swiper/swiper.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../config/RoutesDisney";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlobalProvider } from "../config/GlobalState";
import Scroll from "../components/Header/Scroll";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Route
                    render={(props) => (
                        <>
                            <Header {...props} />
                            <Scroll />
                            <Routes />
                            <Footer />
                        </>
                    )}
                />
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
