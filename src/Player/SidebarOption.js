import React from "react";
import { useDataLayerValue } from "../api/DataLayer";
import "./SidebarOption.css";

function SidebarOption({ name, Icon, identifier }) {
  const [{}, dispatch] = useDataLayerValue();

  const handleClick = () => {
    if (identifier) {
      dispatch({
        type: "SET_ID",
        payload: { id: identifier },
      });
    }
  };

  return (
    <div className="sidebarOption" onClick={handleClick}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{name}</h4> : <p>{name}</p>}
    </div>
  );
}

export default SidebarOption;
