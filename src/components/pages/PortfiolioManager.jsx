import { useState } from "react";

import PortfolioSidebar from "../features/PortfolioSidebar";
import PortfolioForm from "../forms/PortfolioForm";

import {
  INITIAL_FILE_STATE,
  INITIAL_FORM_STATE,
} from "../../helpers/portfolioHelpers";

const PortfolioManager = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [files, setFiles] = useState(INITIAL_FILE_STATE);

  const handleFormField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (section, file, preview) => {
    setFiles((prev) => {
      switch (section) {
        case "thumb":
          return { ...prev, thumb: { file, preview } };
        case "banner":
          return { ...prev, banner: { file, preview } };
        case "logo":
          return { ...prev, logo: { file, preview } };
        case "video":
          return { ...prev, video: { file, preview } };
        default:
          return prev;
      }
    });
  };

  const clearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setFiles(INITIAL_FILE_STATE);
  };

  console.log("files", files);

  const updateFormForEdit = (data) => {};

  return (
    <div className="portfolio-manager-container">
      <div className="left-column">
        <PortfolioForm
          files={files}
          data={formData}
          clearForm={clearForm}
          handleChange={handleFormField}
          handleFileUpload={handleFileUpload}
        />
      </div>

      <div className="right-column">
        <PortfolioSidebar />
      </div>
    </div>
  );
};

export default PortfolioManager;

/* 
  TODO:
    - What can I do in the dashboard?
      - Navigate to form section to add new item
        - Rich text editor
        - Image uploads
        - Video uploads
        - Thumbnail, Banner, Images
      - Activate / Deactivate which projects to show
      - Update the About page (or any page with details) possibly
*/
