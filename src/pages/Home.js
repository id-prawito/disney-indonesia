import React from "react";
import Hero from "../components/Hero";
import CardDisney from "../components/Card";
import { category } from "../services/tmdbApi";
import ListHome from "../components/ListCard";

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
