import "./App.scss";
import "swiper/swiper.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../config/RoutesDisney";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlobalProvider } from "../config/GlobalState";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Route
                    render={(props) => (
                        <>
                            <Header {...props} />
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
