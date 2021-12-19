import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../services/tmdbApi";

const VideoList = (props) => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 6));
        };
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {videos.map((item, i) => (
                <Video key={i} item={item} />
            ))}
        </>
    );
};

const Video = (props) => {
    const item = props.item;
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
        iframeRef.current.setAttribute("height", height);
    }, []);

    return (
        <div className="video">
            <div className="text_video">{item.name}</div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                style={{ border: "none", borderRadius: "5px", width: "100%" }}
                ref={iframeRef}
                title="video"
                allowFullScreen
                type="text/html"
            ></iframe>
        </div>
    );
};

export default VideoList;
