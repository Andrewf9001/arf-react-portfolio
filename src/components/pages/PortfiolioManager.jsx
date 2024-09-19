import { useEffect, useState } from "react";

import PortfolioSidebar from "../features/PortfolioSidebar";
import PortfolioForm from "../forms/PortfolioForm";

import {
  INITIAL_FILE_STATE,
  INITIAL_FORM_STATE,
} from "../../helpers/portfolioHelpers";

const PortfolioManager = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [files, setFiles] = useState(INITIAL_FILE_STATE);

  console.log("formData", formData);

  const handleFormField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (section, file, preview) => {
    setFiles((prev) => {
      cleanupPreviewUrl(prev[section].preview);

      return {
        ...prev,
        [section]: { file, preview },
      };
    });
  };

  const clearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setFiles(INITIAL_FILE_STATE);
  };

  const cleanupPreviewUrl = (url) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  };

  const setPorfolioItem = (id, data) => {
    const {
      bannerUrl,
      category,
      description,
      logoUrl,
      name,
      thumbUrl,
      url,
      urlText,
      videoUrl,
    } = data;

    setFormData({
      id,
      name,
      description,
      category,
      urlText,
      url,
    });

    setFiles({
      thumb: {
        file: null,
        preview: thumbUrl,
      },
      banner: {
        file: null,
        preview: bannerUrl,
      },
      logo: {
        file: null,
        preview: logoUrl,
      },
      video: {
        file: null,
        preview: videoUrl,
      },
    });
  };

  useEffect(() => {
    return () => {
      Object.values(files).forEach(({ preview }) => {
        cleanupPreviewUrl(preview);
      });
    };
  }, [files]);

  return (
    <div className="portfolio-manager-container">
      <div className="left-column">
        <PortfolioForm
          files={files}
          formData={formData}
          clearForm={clearForm}
          handleChange={handleFormField}
          handleFileUpload={handleFileUpload}
        />
      </div>

      <div className="right-column">
        <PortfolioSidebar setPorfolioItem={setPorfolioItem} />
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
