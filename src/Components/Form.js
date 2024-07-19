import React, { useState } from "react";
import "./Form.css";
import CloseIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { formFields } from "../Constants";
import SaveChangesIcon from "@mui/icons-material/Save";


const Form = ({ initialValues, onCloseForm, onSaveChanges }) => {
  const [formState, setFormState] = useState({
    titleText: initialValues?.titleText,
    xPos: initialValues?.position?.x?.toString() || "",
    yPos: initialValues?.position?.y?.toString() || "",
    fontSize: initialValues?.fontSize || "",
    fontWeight: initialValues?.fontWeight || "",
  });

  const handleChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleSaveChanges = () => {
    onSaveChanges(formState);
  };

  return (
    <>
      <div className="Overlay" />
      <div className="FormContainer">
        <div className="TitleContainer">
          <span className="FormTitle">{`Edit ${initialValues?.type}`}</span>
          <CloseIcon className="CloseButton" onClick={onCloseForm} />
        </div>
        <hr className="HorizontalLine" />
        <div className="FormFieldContainer">
          {formFields.map(({ label, field }) => (
            <div className="FormField" key={field}>
              <label className="FormFieldLabel">{label}:</label>
              <input
                type={label === "Text" ? "text" : "number"}
                value={formState[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="FormFieldInput"
                placeholder={
                  label === "Text" ? `This is a ${initialValues?.type}` : ""
                }
              />
            </div>
          ))}
        </div>

         <button
      type="button"
      onClick={handleSaveChanges}
      className="SubmitButton"
      title="Save Changes"
      style={{
        backgroundColor: '#007bff',
        fontSize: '15px',
        fontWeight: 'bold',
        margin: '10px',
        color: '#fff',
        padding: '0.5rem 0.5rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span style={{ marginRight: '0.1rem' }}>Save Changes</span>
      <SaveChangesIcon style={{ width: '24px', height: '24px' }} />
    </button>
      </div>
    </>
  );
};
export default Form;