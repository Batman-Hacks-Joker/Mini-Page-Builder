import React, { useState, useEffect } from "react";
import "./Page.css";
import FormComponent from "./Form";
import FileDownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; 
import SideBar from "./SideBar";

import { LOCAL_STORAGE_KEY } from "../Constants";

function renderElementByType(element) {
  switch (element.type) {
    case "label":
      return (
        <span
          className="label-content"
          style={{
            fontSize: parseInt(element?.fontSize),
            fontWeight: element?.fontWeight,
          }}
        >
          {element.titleText || `This is a label`}
        </span>
      );
    case "input":
      return (
        <input
          className="input-field"
          value={element.titleText || ""}
          style={{
            fontSize: parseInt(element?.fontSize) || "20px",
            fontWeight: element?.fontWeight,
            border: 0,
          }}
        />
      );
    case "button":
      return (
        <button
          className="button"
          style={{
            fontSize: parseInt(element?.fontSize),
            fontWeight: element?.fontWeight,
            background: "#0044c1",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "grab",
          }}
        >
          {element.titleText || "Button"}
        </button>
      );
    default:
      return null;
  }
}

function Page() {
  const [droppedComponents, setDroppedComponents] = useState(() => {
    const storedComponents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedComponents ? JSON.parse(storedComponents) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(droppedComponents));
  }, [droppedComponents]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Delete" ||
        (event.key === "Backspace" &&
          !(
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
          ))
      ) {
        if (selectedComponentIndex !== null) {
          handleDeleteComponent(selectedComponentIndex);
        }
      }
      if (event.key === "Enter") {
        if (selectedComponentIndex !== null) {
          setShowForm(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponentIndex]);

  const handleDrop = (e) => {
    e.preventDefault();
    const componentText = e.dataTransfer.getData("element");
    console.log(componentText);
    const position = { x: e.clientX, y: e.clientY };
    if (draggedComponent == null) {
      e.dataTransfer.clearData();
      setDroppedComponents([
        ...droppedComponents,
        { type: componentText, position },
      ]);
      setSelectedComponentIndex(droppedComponents.length);
      setShowForm(true);
    } else {
      const updatedComponents = [...droppedComponents];
      updatedComponents[draggedComponent].position = {
        x: e.clientX,
        y: e.clientY,
      };
      updatedComponents[draggedComponent].xPos = e.clientX;
      updatedComponents[draggedComponent].yPos = e.clientY;

      console.log(updatedComponents);
      setDroppedComponents(updatedComponents);
      setDraggedComponent(null);
    }
  };
  const handleDragStart = (e, index) => {
    setDraggedComponent(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = () => {
    setDraggedComponent(null);
    document.querySelectorAll(".block-button").forEach((element) => {
      element.classList.remove("dragging");
      element.style.cursor = "grab";
    });
  };

  const handleCloseForm = (del = true) => {
    if (del) {
      const updatedComponents = [...droppedComponents];
      updatedComponents.pop();
      setDroppedComponents(updatedComponents);
    }

    setSelectedComponentIndex(null);
    setShowForm(false);
    setDraggedComponent(null);
  };
  const handleSaveChanges = (updatedValues) => {
    if (selectedComponentIndex !== null) {
      const updatedComponents = [...droppedComponents];
      updatedComponents[selectedComponentIndex] = {
        ...updatedComponents[selectedComponentIndex],
        ...updatedValues,
      };
      setDroppedComponents(updatedComponents);
      handleCloseForm(false);
    }
  };
  const handleComponentClick = (index) => {
    setSelectedComponentIndex(index);
  };
  const handleDeleteComponent = (index) => {
    console.log("delete triggered");
    const updatedComponents = [...droppedComponents];
    updatedComponents.splice(index, 1);
    setDroppedComponents(updatedComponents);
    setSelectedComponentIndex(null);
  };
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target.result);
            setDroppedComponents(importedData.droppedComponents);
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const exportData = {
      droppedComponents,
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page_configuration.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleClearPage = () => {
    // Clear all dropped components
    setDroppedComponents([]);
    setSelectedComponentIndex(null);
    setShowForm(false);
    setDraggedComponent(null);
  };



  return (

    <div className="Page">
      <button
        onClick={handleExport}
        className="FileDownloadButton"
        title="Download as JSON"
      > 
       <FileDownloadIcon />
      </button>
      <button
        onClick={handleImport}
        className="FileUploadButton"
        title="Upload JSON"
      >
        <FileUploadIcon />
      </button>
      <button
        onClick={handleClearPage}
        className="ClearPageButton"
        title="Clear Page"
      >
        <DeleteForeverIcon />
        Clear Page
      </button>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="dropped-components-container"
      >
        {droppedComponents.map((element, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: parseInt(element?.xPos) || element?.position?.x,
              top: parseInt(element?.yPos) || element?.position?.y,
              border:
                index !== selectedComponentIndex
                  ? ""
                  : showForm
                  ? ""
                  : "2px solid red",
              cursor:
                showForm && selectedComponentIndex === index
                  ? "default"
                  : index === draggedComponent
                  ? "grabbing"
                  : "grab",
              flex: 1,
            }}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            draggable
            onClick={() => handleComponentClick(index)}
          >
            {showForm && selectedComponentIndex === index
              ? null
              : renderElementByType(element)}
          </div>
        ))}
        {showForm && selectedComponentIndex !== null && (
          <FormComponent
            initialValues={droppedComponents[selectedComponentIndex]}
            onCloseForm={handleCloseForm}
            onSaveChanges={handleSaveChanges}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
