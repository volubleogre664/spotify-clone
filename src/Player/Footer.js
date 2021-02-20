import React, { useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviuosIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";
import { PlaylistPlay, VolumeDown } from "@material-ui/icons";
import { useDataLayerValue } from "../api/DataLayer";

function Footer({ spotify }) {
  const [{ trackId, playing }, dispatch] = useDataLayerValue();
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(
    async function () {
      if (trackId) {
        await spotify.getTrack(trackId).then((data) => {
          setCurrentTrack(data);
        });
      }
    },
    [dispatch, trackId, spotify, setCurrentTrack]
  );

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: "SET_PLAYING",
        payload: { playing: r.is_playing },
      });

      dispatch({
        type: "SET_ITEM",
        payload: { item: r.item },
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        payload: { playing: false },
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        payload: { playing: true },
      });
    }
  };

  async function skipNext() {
    await spotify.skipToNext();
    await spotify.getMyCurrentPlayingTrack().then((r) => {
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
  }

  async function skipPrevious() {
    await spotify.skipToPrevious();
    await spotify.getMyCurrentPlayingTrack().then((r) => {
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
  }

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={currentTrack?.album?.images[0]?.url}
          alt="album art"
        />
        <div className="footer__songInfo">
          <h4>{currentTrack?.name}</h4>
          <p>
            {currentTrack?.artists?.map((artist) => artist?.name + ", ")}
            {currentTrack?.album?.name}
          </p>
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviuosIcon className="footer__icon" onClick={skipPrevious} />
        <PlayCircleOutlineIcon
          className="footer__green"
          fontSize="large"
          onClick={handlePlayPause}
        />
        <SkipNextIcon className="footer__icon" onClick={skipNext} />
        <RepeatIcon className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay />
          </Grid>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
