import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "./components/DragZone";
import DraggableElement from "./components/DraggableElement";
import EditElementModal from "./components/EditElementModal";
import { generateUniqueKey } from "./utils/generateUniqueKey";

function App() {
  const [elements] = useState([
    { type: "label", content: "Label" },
    { type: "input", content: "Input" },
    { type: "button", content: "Button" },
  ]);
  const [elementsInLayout, setElementsInLayout] = useState([]);
  const [isEditingElement, setIsEditingElement] = useState(null); // Store element being edited

  useEffect(() => {
    // Update local storage on state changes
    localStorage.setItem("appData", JSON.stringify({ elementsInLayout }));
  }, [elements, elementsInLayout]);

  const handleDropElement = (element) => {
    // Update elementsInLayout with dropped element data
    setIsEditingElement(element); // Set element to be edited
  };

  const handleCloseModal = () => {
    setIsEditingElement(null); // Clear editing element
  };

  const handleSaveElement = (data) => {
    const key = generateUniqueKey();
    setElementsInLayout((prev) => [...prev, { ...data, id: key }]);
  };

  const handleUpdatePosition = (id, x, y) => {
    // Update position of element in layout
    const updatedElementsInLayout = elementsInLayout.map((el) => {
      if (el.id === id) {
        return { ...el, x, y };
      }
      return el;
    });
    setElementsInLayout(updatedElementsInLayout);
  };

  const handleExportData = () => {
    const data = localStorage.getItem("appData");
    if (!data) {
      return; // Handle no data scenario (optional)
    }
    const jsonData = JSON.parse(data);
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    }); // Formatted JSON
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "app_data.json";
    link.click();

    // Optional: Revoke the object URL after download to avoid memory leaks
    window.URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="editScreen" className="flex min-h-screen">
        {/* <div className="w-full md:w-3/4"> */}
        <DropZone
          elementsInLayout={elementsInLayout}
          onDropElement={handleDropElement}
          setIsEditingElement={setIsEditingElement}
          setElementsInLayout={setElementsInLayout}
          handleUpdatePosition={handleUpdatePosition}
          handleExportData={handleExportData}
        />
        {/* </div> */}
        <div
          id="componentsMenu"
          className="flex flex-col w-1/5 gap-[16px] p-4 border bg-[#2d2d2d] cursor-move"
        >
          <p className="text-[#ffffff] font-medium">Blocks</p>
          {elements.map((element) => (
            <DraggableElement
              key={element.type}
              type={element.type}
              content={element.content}
              x={element.x || 0}
              y={element.y || 0}
            />
          ))}
        </div>
        {isEditingElement && (
          <EditElementModal
            element={isEditingElement}
            onClose={handleCloseModal}
            onSave={handleSaveElement}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
