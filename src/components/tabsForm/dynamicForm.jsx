import { useState } from "react";

import { formJson } from './constant';
import './dynamicForm.css';

export const DynamicForm = () => {
  const [activeTab, setActiveTab] = useState("PrimaryDetails");
  const [formData, setFormData] = useState({});
  const [members, setMembers] = useState([]);
  const [salarySlipRequired, setSalarySlipRequired] = useState(false);
  const [memberTotal, setMemberTotal] = useState(0);
  const [fileError, setFileError] = useState("");  

  const handleInputChange = (e, field) => {
    const { value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field]: type === "number" ? Number(value) : value
    }));

    if (field === "annualIncome") {
      setSalarySlipRequired(Number(value) > 50000);
    }
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = [...members];
    const value = Number(e.target.value);
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < 3 && memberTotal < 100) {
      setMembers([...members, 0]);
    }
  };

  const validateFile = (file) => {
    const allowedExtensions = ["pdf", "jpeg", "jpg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setFileError("Invalid file format. Only PDF, JPEG, JPG, PNG allowed.");
      return false;
    }

    setFileError("");
    return true;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setFormData((prev) => ({ ...prev, salarySlip: file }));
    }
  };

  const handleSubmit = () => {
    const sum = members.reduce((acc, val) => acc + (val || 0), 0);
    setMemberTotal(sum);

    if (sum > 100) {
      alert("Total percentage allocation must be exactly 100%");
      return;
    }
    setMembers([]);
    
    if (!Object.keys(formData).length) {
      alert("Enter the valid details");
      return;
    }

    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <div className="form-container">
      <h2>Dynamic Input Form</h2>
      
      <div className="tabs">
        {Object.keys(formJson.sections).map((section) => (
          <button
            key={section}
            onClick={() => setActiveTab(section)}
            className={activeTab === section ? "tab-heading active" : "tab-heading"}
          >
            {section.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      <div className="form">
        {formJson.sections[activeTab].map((field) => {
          const question = formJson.questions[field];
          if (!question) return null;

          return (
            <div key={field} className="form-group">
              <label htmlFor={question.label}>{question.label}</label>
              {question.type === "select" ? (
                <select className="selectOption" onChange={(e) => handleInputChange(e, field)}>
                  <option value="">Select</option>
                  <option value="Option1">Option 1</option>
                  <option value="Option2">Option 2</option>
                </select>
              ) : question.type === "radio" ? (
                <div className="radio-fields">
                  <div className="radio-field">
                    <input type="radio" name={field} value="Male" onChange={(e) => handleInputChange(e, field)} />
                    <label htmlFor="Male">Male</label>
                  </div>
                  <div className="radio-field">
                    <input type="radio" name={field} value="Female" onChange={(e) => handleInputChange(e, field)} />
                    <label htmlFor="Female">Female</label>
                  </div>
                </div>
              ) : (
                <input
                  type={question.type}
                  onChange={(e) => handleInputChange(e, field)}
                  name={question.label}
                  placeholder={`Enter the ${question.label}`}
                />
              )}
            </div>
          );
        })}

        {activeTab === "MembersAllocation" && (
          <>
            {members?.map((_, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`Member ${index+1} Percentage`}>{`Member ${index+1} Percentage`}</label>
                <input
                  type="number"
                  name={`Member ${index+1} Percentage`}
                  onChange={(e) => handleMemberChange(e, index)}
                  placeholder={`Enter Member ${index + 1} percentage`}
                />
              </div>
            ))}
          </>
        )}

        {salarySlipRequired && activeTab === "OtherDetails" && (
          <div className="form-group">
            <label>Upload Salary Slip</label>
            <input type="file" onChange={handleFileUpload} />
            {fileError && <p className="error">{fileError}</p>}
          </div>
        )}
      </div>
      <div className="form-buttons">
        {members.length < 3 && memberTotal < 100 && activeTab === "MembersAllocation" && (
          <button className="add-member-button" onClick={addMember}>Add Member</button>
        )}
        {activeTab === "MembersAllocation" && <button className="submit-form" onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default DynamicForm;
