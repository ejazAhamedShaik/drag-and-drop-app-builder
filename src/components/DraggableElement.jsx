import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
// import SvgDrag from "./SvgDrag";

const DraggableElement = ({ type, content, x, y, onElementPositionChange }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { type, content },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const handleDragEnd = (e) => {
    const { clientX, clientY } = e;
    if (onElementPositionChange) {
      onElementPositionChange({ x: clientX, y: clientY });
    }
  };

  return (
    <div
      ref={drag}
      className={`${
        isDragging
          ? "bg-gray-200 cursor-grabbing shadow-lg shadow-gray-500"
          : "bg-white cursor-grab"
      } p-2 border border-gray-300 cursor-move rounded-md`}
      style={{ left: `${x}px`, top: `${y}px` }}
      draggable={true}
      onDragEnd={handleDragEnd}
    >
      {/* <SvgDrag /> */}
      <p className="font-medium">{content}</p>
    </div>
  );
};

DraggableElement.propTypes = {
  type: PropTypes.oneOf(["label", "input", "button"]).isRequired,
  content: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onElementPositionChange: PropTypes.func,
};

export default DraggableElement;
