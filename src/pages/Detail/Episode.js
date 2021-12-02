import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiConfig from "../../services/apiConfig";
import tmdbApi from "../../services/tmdbApi";

const Episode = (props) => {
    const { category } = useParams();
    const season = props.number_of_seasons;
    const [episode, setEpisode] = useState([]);

    useEffect(() => {
        const getEpisode = async () => {
            try {
                const evonyaNamanya = [];
                for (let i = 1; i <= season; i++) {
                    const res = await tmdbApi.episode(category, props.id, [i]);
                    evonyaNamanya.push(res);
                }
                setEpisode(evonyaNamanya);
            } catch {
                console.log("error");
            }
        };
        getEpisode();
    }, [category, props.id, season]);
    console.log(episode);

    return (
        <div className="container_episode">
            {episode.map((itemnya, i) => (
                <div className="card" key={i}>
                    <Episodenya itemnya={itemnya} />
                </div>
            ))}
        </div>
    );
};

const Episodenya = (props) => {
    const itemnya = props.itemnya;

    return (
        <div className="jumlah_season">
            <div className="text_season">Season {itemnya.season_number}</div>
            <div className="episode_grid">
                {itemnya.episodes.map((item_episode, i) => (
                    <div key={i} className="grid_card">
                        <div className="gambarnya">
                            {item_episode.still_path === null ? (
                                <div
                                    className="text"
                                    style={{ fontSize: "8px", margin: "auto " }}
                                >
                                    gambarnya tidak ada
                                </div>
                            ) : (
                                <img
                                    src={apiConfig.w500Image(
                                        item_episode.still_path
                                    )}
                                    alt="gambarnya"
                                />
                            )}
                            <div className="detailss"></div>
                        </div>
                        <div className="keterangannya">
                            <div className="text_judul_episode">
                                {`Episode ${item_episode.episode_number} :  ${item_episode.name}`}
                            </div>
                            <div className="text_keterangan">
                                {item_episode.overview}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Episode;
