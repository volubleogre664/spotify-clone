import React from "react";
import { useDataLayerValue } from "../api/DataLayer";
import "./Songrow.css";

function Songrow({ track, playSong }) {
  const [{}, dispatch] = useDataLayerValue();

  const handleSongClick = () => {
    dispatch({
      type: "SET_TRACK_ID",
      payload: { trackId: track.id },
    });

    playSong(track.id);
  };

  return (
    <div className="songrow" onClick={handleSongClick}>
      <img
        className="songrow__album"
        src={track?.album?.images[0]?.url}
        alt=""
      />
      <div className="songrow__info">
        <h1>{track?.name}</h1>
        <p>
          {track?.artists?.map((artist) => artist?.name + ", ")}
          {track?.album?.name}
        </p>
      </div>
    </div>
  );
}

export default Songrow;
