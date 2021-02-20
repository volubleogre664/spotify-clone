import React, { useEffect } from "react";
import { useDataLayerValue } from "../api/DataLayer";
import "./Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Songrow from "./Songrow";

function Body({ spotify }) {
  const [
    { discover_weekly, id, playing, device },
    dispatch,
  ] = useDataLayerValue();
  useEffect(
    async function () {
      if (id) {
        await spotify
          .getPlaylist(id)
          .then((res) => {
            dispatch({
              type: "SET_DISCOVER_WEEKLY",
              payload: { discover_weekly: res },
            });

            if (!playing) {
              dispatch({
                type: "SET_TRACK_ID",
                payload: { trackId: res?.tracks?.items[0]?.track?.id },
              });
            }
          })
          .catch((err) => console.log("Error has occured >>>", err));
      }
    },
    [spotify, id, dispatch]
  );

  const playPlaylist = () => {
    spotify
      .play({
        device_id: device.id,
        context_uri: `spotify:playlist:${id}`,
        play: true,
        offset: { position: 0 },
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          console.log(r);
          dispatch({
            type: "SET_ITEM",
            payload: { item: r.item },
          });

          dispatch({
            type: "SET_PLAYING",
            payload: { playing: true },
          });

          dispatch({
            type: "SET_TRACK_ID",
            payload: { trackId: r.item.id },
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        device_id: device.id,
        uris: [`spotify:track:${id}`],
        play: true,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            payload: { item: r.item },
          });

          dispatch({
            type: "SET_PLAYING",
            payload: { playing: true },
          });

          dispatch({
            type: "SET_TRACK_ID",
            payload: { trackId: r.item.id },
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img
          src={discover_weekly?.images[0].url}
          alt=""
          className="body__infoImg"
        />

        <div className="body__infoText">
          <strong>{discover_weekly?.name}</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks?.items?.map((item, i) => {
          return <Songrow key={i} playSong={playSong} track={item.track} />;
        })}
      </div>
    </div>
  );
}

export default Body;
