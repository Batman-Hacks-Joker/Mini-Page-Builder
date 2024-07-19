
import DragIndicatorIcon from "@mui/icons-material/PanTool";
import "./DraggableItem.css";

const DraggableItem = ({ type, label }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("element", type);

    event.dataTransfer.effectAllowed = "move";
    event.target.classList.add("dragging");
  };

  return (
    <div draggable className="block-button" onDragStart={handleDragStart}>
      <DragIndicatorIcon className="drag-icon" />
      <p>{label}</p>
    </div>
  );
};

export default DraggableItem;