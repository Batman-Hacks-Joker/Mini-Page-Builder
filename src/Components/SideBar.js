import React from "react";
import DraggableItem from "./DraggableItem";
import "./SideBar.css";
import { blocks } from "../Constants";
function SideBar() {
  return (
    <div className="sidebar">
      <h3>BLOCKS</h3>
      <div className="blocks">
        {blocks.map((block) => (
          <DraggableItem
            key={block?.type}
            type={block?.type}
            label={block?.label}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;