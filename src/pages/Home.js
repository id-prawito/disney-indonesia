import React from "react";
import { category } from "../services/tmdbApi";
import CardDisney from "../components/Disney";
import ListHome from "../components/ListCard";
import Hero from "../components/Hero";

const Home = () => {
    return (
        <>
            <Hero params={{ pages: 1 }} category={category.movie} />
            <CardDisney />
            <ListHome />
        </>
    );
};

export default Home;
