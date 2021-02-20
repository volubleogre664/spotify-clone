import { useEffect } from "react";
import "./App.css";
import Login from "./Login/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player/Player";
import { useDataLayerValue } from "./api/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(async function () {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    let id = null;
    window.location.hash = "";

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        payload: { token: _token },
      });

      await spotify
        .getMe()
        .then((user) => {
          dispatch({
            type: "SET_USER",
            payload: { user },
          });
        })
        .catch(() => console.log("Error found"));

      await spotify.getMyDevices().then((data) => {
        dispatch({
          type: "SET_DEVICE",
          payload: { device: data.devices[0] },
        });
      });

      await spotify.getUserPlaylists().then((playlists) => {
        if (!playlists.items[0]) {
          spotify
            .getFeaturedPlaylists()
            .then((data) => {
              dispatch({
                type: "SET_PLAYLISTS",
                payload: { playlists: data.playlists },
              });

              dispatch({
                type: "SET_ID",
                payload: { id: data.playlists.items[0].id },
              });

              id = data.playlists.items[0].id;
            })
            .catch((err) => console.error("Error ooccured mate >>>> ", err));
        } else {
          dispatch({
            type: "SET_PLAYLISTS",
            payload: { playlists },
          });
        }
      });
    }
  }, []);

  return (
    <div className="app">
      {/* Lol */}
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
