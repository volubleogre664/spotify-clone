export const initialState = {
  user: null,
  id: null,
  trackId: null,
  //   token:
  //     "BQAnosDt3ne14JpG6tJIjmmE2JdmgfnVZxnnRFispUK9hSS_YtM4tNnkAKEPqETA520ZwdXl3UUqB3DolNLy2GCypibXLfSVWhf_c8E5CefFuwNcv3tZnMtedH9cuK3CVmAPO_6SRODJgB0KfVP8pyiyp6PD2gpJLaRasDClJU6TKCTa",
  playlists: null,
  discover_weekly: null,
  playing: false,
  device: null,
  item: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case "SET_TOKEN": {
      return {
        ...state,
        token: action.payload.token,
      };
    }

    case "SET_PLAYLISTS": {
      return {
        ...state,
        playlists: action.payload.playlists,
      };
    }

    case "SET_DISCOVER_WEEKLY": {
      return {
        ...state,
        discover_weekly: action.payload?.discover_weekly,
      };
    }

    case "SET_ID": {
      return {
        ...state,
        id: action.payload.id,
      };
    }

    case "SET_TRACK_ID": {
      return {
        ...state,
        trackId: action.payload.trackId,
      };
    }

    case "SET_PLAYING": {
      return {
        ...state,
        playing: action.payload.playing,
      };
    }

    case "SET_ITEM": {
      return {
        ...state,
        item: action.payload.item,
      };
    }

    case "SET_DEVICE": {
      return {
        ...state,
        device: action.payload.device,
      };
    }

    default:
      return state;
  }
}
