import React from "react";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import tmdbApi from "../../services/tmdbApi";
// import { NavLink } from "react-router-dom";
import { ButtonIconLain } from "../Button";
import { MovieCardSearch, TvCardSeacrh } from "../MovieCard";

const Search = () => {
    const [query, setQuery] = useState("");

    const [items, setItems] = useState([]);
    const [itemsTv, setItemsTv] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                if (query === "") {
                    // console.log("query belum ada");
                } else {
                    const category = "movie";
                    const params = {
                        query: query,
                    };
                    response = await tmdbApi.search(category, {
                        params,
                    });
                }
                setItems(response.results);

                // setTotalPage(response.total_pages);
            } catch {
                // console.log("query belum dimasukan");
            }
        };
        getList();
    }, [query]);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                if (query === "") {
                    // console.log("");
                } else {
                    const category = "tv";
                    const params = {
                        query: query,
                    };
                    response = await tmdbApi.search(category, {
                        params,
                    });
                }
                setItemsTv(response.results);
            } catch {
                // console.log("");
            }
        };
        getList();
    }, [query]);

    // const data = { ...items, ...itemsTv };

    // console.log(data);
    // console.log(items);

    return (
        <>
            <div className="header__item">
                <div className="search">
                    <div className="search_bar">
                        <input
                            type="text"
                            placeholder="Enter keyword"
                            value={query}
                            onChange={onChange}
                        />
                        <ButtonIconLain
                            className="icon_small_transparent_search"
                            onClick={() =>
                                alert(
                                    "Sorry, video not found, because this is just data form TMBD.\nYou can watch this video from Netflix or Disney+. :)"
                                )
                            }
                        >
                            <FaSearch />
                        </ButtonIconLain>
                    </div>

                    {query === "" ? null : items.length !== 0 ? (
                        <div className="search_result">
                            {query === "" ? null : (
                                <>
                                    {items &&
                                        items.map((item, i) => (
                                            <MovieCardSearch
                                                key={i}
                                                className="card_slide"
                                                item={item}
                                                category="movie"
                                            />
                                        ))}

                                    {itemsTv &&
                                        itemsTv.map((item, i) => (
                                            <TvCardSeacrh
                                                key={i}
                                                className="card_slide"
                                                item={item}
                                                category="tv"
                                            />
                                        ))}
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Search;
