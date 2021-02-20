import React from "react";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SidebarOption from "./SidebarOption";
import { useDataLayerValue } from "../api/DataLayer";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />

      <SidebarOption Icon={HomeIcon} name="Home" />
      <SidebarOption Icon={SearchIcon} name="Search" />
      <SidebarOption Icon={LibraryMusicIcon} name="Your Library" />

      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      <div className="sidebar__playlists">
        {playlists?.items?.map((playlist, i) => (
          <SidebarOption
            key={i}
            identifier={playlist.id}
            name={playlist?.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
