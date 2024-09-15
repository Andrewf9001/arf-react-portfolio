import { useRef, useState } from "react";

import PortfolioSidebar from "../features/PortfolioSidebar";
import PortfolioForm from "../features/PortfolioForm";

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  category: "",
  urlText: "",
  url: "",
};

const PortfolioManager = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const thumbRef = useRef();
  const bannerRef = useRef();
  const logoRef = useRef();
  const videoRef = useRef();

  const handleFormField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData(INITIAL_FORM_STATE);

    thumbRef.current.value = "";
    bannerRef.current.value = "";
    logoRef.current.value = "";
    videoRef.current.value = "";
  };

  return (
    <div className="portfolio-manager-container">
      <div className="left-column">
        <PortfolioForm
          ref={{ thumbRef, bannerRef, logoRef, videoRef }}
          data={formData}
          clearForm={clearForm}
          handleChange={handleFormField}
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
