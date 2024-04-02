import { useState } from "react";
import PropTypes from "prop-types";

const EditElementModal = ({ element, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...element,
    type: element.type,
    content: element.content || "", // Pre-fill text for label
    x: element.x || 0,
    y: element.y || 0,
    fontSize: "16px", // Default font size
    fontWeight: "normal", // Default font weight
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData); // Pass updated data to onSave handler
    onClose(); // Close modal after save
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-[20%] mx-auto">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4">
            <h5 className="text-xl font-medium">Edit {element.type}</h5>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="relative p-2 flex-auto">
            <form className="flex flex-col gap-[16px]">
              <div>
                <label className="block text-gray text-sm mb-1">Text</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray text-sm mb-1">X</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="x"
                  value={formData.x}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray text-sm mb-1">Y</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="y"
                  value={formData.y}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray text-sm mb-1">
                  Font Size
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="fontSize"
                  value={formData.fontSize}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray text-sm mb-1">
                  Font Weight
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="fontWeight"
                  value={formData.fontWeight}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="flex items-center p-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-[#1348ba] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditElementModal.propTypes = {
  element: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditElementModal;
