import React, { useRef } from "react";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import tmdbApi from "../../services/tmdbApi";
import styled from "styled-components";
import { MovieCardSearch, TvCardSearch } from "../MovieCard";

const Form = styled.div`
    position: relative;
    background: #1a1d29;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 0.1px solid rgba(255, 255, 255, 0.3); */
    width: ${(props) => (props.state ? "19rem" : "32px")};
    cursor: ${(props) => (props.state ? "auto" : "pointer")};
    outline: none;
    gap: ${(props) => (props.state ? "20px" : "0")};
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 8px;

    @media only screen and (min-device-width: 320px) and (max-device-width: 420px) {
        display: none;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        width: ${(props) => (props.state ? "16rem" : "32px")};
    }
`;

const Input = styled.input`
    font-size: 14px;
    line-height: 1;
    font-weight: 300;
    background-color: transparent;
    padding: 0px;
    width: 100%;
    margin-left: ${(props) => (props.state ? "-20px" : "0rem")};
    border: none;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus,
    &:active {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;

const Button = styled.button`
    line-height: 1;
    pointer-events: ${(props) => (props.state ? "auto" : "none")};
    cursor: ${(props) => (props.state ? "pointer" : "none")};
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    display: flex;
    padding: 8px;
    font-size: 16px;
    margin-left: 0px;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const SearchHasil = styled.div`
    margin-top: 10px;
    /* width: 300px; */
    height: 300px;
    background-color: #1a1d29;
    border-radius: 8px;
    overflow-y: auto;
    display: ${(props) => (props.state ? "block" : "none")};
    position: absolute;
    margin-top: 350px;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const SearchHasilNot = styled.div`
    margin-top: 250px;
    width: 100%;
    height: 200px;
    background-color: #1a1d29;
    // overflow: hidden;
    border-radius: 8px;
    overflow-y: auto;
    display: ${(props) => (props.state ? "block" : "none")};
    position: absolute;
`;

const NotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 14px;
`;

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
    // console.log(itemsTv);

    const [state, setState] = useState(false);
    const node = useRef();
    const inputFocus = useRef();

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // cleanup event when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    // On click outside, change input state to false
    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        } else {
            setState(false);
        }
        // outside click
    };

    return (
        <>
            <div className="header__item">
                <div className="search">
                    <Form
                        state={state}
                        onClick={() => {
                            setState(true);
                            inputFocus.current.focus();
                        }}
                        ref={node}
                    >
                        <Button type="submit" state={state}>
                            <FaSearch />
                        </Button>
                        <Input
                            onChange={onChange}
                            ref={inputFocus}
                            value={query}
                            state={state}
                            type="text"
                            placeholder="search for a movie or tv..."
                        />
                        {query === "" ? null : items.length !== 0 ? (
                            <SearchHasil state={state}>
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
                                                <TvCardSearch
                                                    key={i}
                                                    className="card_slide"
                                                    item={item}
                                                    category="tv"
                                                />
                                            ))}
                                    </>
                                )}
                            </SearchHasil>
                        ) : (
                            <SearchHasilNot state={state}>
                                <NotFound>
                                    <h4>Not Found</h4>
                                </NotFound>
                            </SearchHasilNot>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Search;
