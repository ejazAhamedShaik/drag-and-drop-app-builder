/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const DropZone = ({
  elementsInLayout,
  onDropElement,
  setIsEditingElement,
  setElementsInLayout,
  handleUpdatePosition,
  handleExportData,
}) => {
  const [activeElementKey, setActiveElementKey] = useState(null);
  const [isDraggingId, setIsDraggingId] = useState(null);
  const elementRef = useRef(null);

  const [{ isOver1 }, dropElement] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      onDropElement({ ...item, ...clientOffset });
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    // item: { type, content },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && activeElementKey !== null) handleEnterKey();
    else if (event.key === "Delete" && activeElementKey !== null)
      handleDeleteElement();
  };

  const handleEnterKey = () => {
    setIsEditingElement((prev) => {
      return elementsInLayout.find((el) => el.id === activeElementKey);
    }); // Set element to be edited
    setActiveElementKey(null); // Clear active element (to prevent focus on the element
  };

  const handleDeleteElement = () => {
    const newElementsInLayout = elementsInLayout.filter(
      (el) => el.id !== activeElementKey
    );
    setElementsInLayout(newElementsInLayout);
    setActiveElementKey(null);
  };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const { clientX, clientY } = e;
  //   console.log(e);
  //   handleUpdatePosition(isDraggingId, clientX, clientY);
  // };

  return (
    <div
      className="bg-[#f3f3f3] p-[24px] w-full md:w-4/5 relative"
      ref={dropElement}
    >
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleExportData}
      >
        Export
      </button>
      {elementsInLayout.map((element) => (
        <div
          className={`${
            activeElementKey === element.id ? "border-2 border-red-500" : ""
          } ${
            isDragging === element.id
              ? "cursor-grabbing shadow-lg shadow-gray-300"
              : ""
          }`}
          key={element.id}
          style={{
            position: "absolute", // Set absolute positioning
            left: `${element.x}px`, // Use captured x coordinate
            top: `${element.y}px`, // Use captured y coordinate
            fontSize: `${element.fontSize}`, // Use captured font size
            fontWeight: `${element.fontWeight}`, // Use captured font weight
          }}
          tabIndex="0"
          onClick={() => setActiveElementKey(element.id)}
          onKeyDown={handleKeyDown}
          ref={drag}
          draggable={true}
          onDragStart={() => setIsDraggingId(element.id)}
          // onDragOver={(e) => e.preventDefault()}
          // onDrop={handleDrop}
        >
          {element.type === "label" && (
            <label id={element.id} ref={elementRef}>
              {element.content}
            </label>
          )}
          {element.type === "input" && (
            <input
              id={element.id}
              type="text"
              value={element.content}
              className="p-4 rounded-md"
              ref={elementRef}
            />
          )}
          {element.type === "button" && (
            <button
              id={element.id}
              className="p-4 bg-[#245678] w-[150px] rounded-md"
              ref={elementRef}
            >
              {element.content}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

DropZone.propTypes = {
  elementsInLayout: PropTypes.array,
  onDropElement: PropTypes.func.isRequired,
  setIsEditingElement: PropTypes.func.isRequired,
  setElementsInLayout: PropTypes.func.isRequired,
  handleUpdatePosition: PropTypes.func.isRequired,
  handleExportData: PropTypes.func.isRequired,
};

export default DropZone;
