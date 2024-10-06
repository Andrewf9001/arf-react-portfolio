import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import DragDropPad from "../features/dropzone/DragDropPad";

import { storage } from "../../services/firebase";
import { useAppData } from "../../context/AppDataContext";

const PortfolioForm = (props) => {
  const {
    files,
    formData,
    clearForm,
    removeFile,
    handleChange,
    handleFileUpload,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { addProject, updateProject } = useAppData();

  const uploadToStorage = async (file, path) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleFile = (file, path) => {
    return file ? uploadToStorage(file, path) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.category) return;

    try {
      const thumbUrl = files.thumb.file
        ? await handleFile(files.thumb.file, "thumbnails")
        : formData.id
        ? files.thumb.preview
        : null;

      const bannerUrl = files.banner.file
        ? await handleFile(files.banner.file, "banners")
        : formData.id
        ? files.banner.preview
        : null;

      const logoUrl = files.logo.file
        ? await handleFile(files.logo.file, "logos")
        : formData.id
        ? files.logo.preview
        : null;

      const videoUrl = files.video.file
        ? await handleFile(files.video.file, "videos")
        : formData.id
        ? files.video.preview
        : null;

      const data = {
        name: formData.name,
        url: formData.url,
        urlText: formData.urlText,
        description: formData.description,
        category: formData.category,
        thumbUrl,
        bannerUrl,
        logoUrl,
        videoUrl,
      };

      formData.id ? updateProject(formData.id, data) : addProject(data);

      clearForm();
      setIsLoading(false);
    } catch (e) {
      console.error("Form Submission: ", e);
      setIsLoading(false);
    }
  };

  const onSuccessfulDrop = (file, type) => {
    const preview = file ? URL.createObjectURL(file) : "";

    handleFileUpload(type, file, preview);
  };

  return (
    <form className="portfolio-form-container" onSubmit={handleSubmit}>
      <div className="two-column">
        <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={formData.name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <select
          name="category"
          value={formData.category}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        >
          <option value="">Category</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Projects">Web Development</option>
        </select>
      </div>

      <div className="two-column">
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <input
          type="text"
          name="urlText"
          placeholder="URL Link Text"
          value={formData.urlText}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>

      <div className="one-column">
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          value={formData.description}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>

      <div className="upload-wrapper">
        <div className="drop-wrapper">
          <div>Thumb Image</div>
          <DragDropPad
            imageType="thumb"
            accept="image/*"
            onSuccessfulDrop={onSuccessfulDrop}
          >
            {files.thumb.preview && (
              <img src={files.thumb.preview} alt="Portfolio Item Thumbnail" />
            )}
          </DragDropPad>

          {files.thumb.preview && (
            <button onClick={(e) => removeFile(e, "thumb")}>Remove file</button>
          )}
        </div>

        <div className="drop-wrapper">
          <div>Banner Image</div>
          <DragDropPad
            imageType="banner"
            accept="image/*"
            onSuccessfulDrop={onSuccessfulDrop}
          >
            {files.banner.preview && (
              <img src={files.banner.preview} alt="Portfolio Item Banner" />
            )}
          </DragDropPad>

          {files.banner.preview && (
            <button onClick={(e) => removeFile(e, "banner")}>
              Remove file
            </button>
          )}
        </div>

        <div className="drop-wrapper">
          <div>Logo Image</div>
          <DragDropPad
            imageType="logo"
            accept="image/*"
            onSuccessfulDrop={onSuccessfulDrop}
          >
            {files.logo.preview && (
              <img src={files.logo.preview} alt="Portfolio Item Logo" />
            )}
          </DragDropPad>

          {files.logo.preview && (
            <button onClick={(e) => removeFile(e, "logo")}>Remove file</button>
          )}
        </div>
      </div>

      <div className="video-upload-wrapper">
        <div>Video</div>
        <DragDropPad
          imageType="video"
          accept="video/*"
          onSuccessfulDrop={onSuccessfulDrop}
        >
          {files.video.preview && <video controls src={files.video.preview} />}
        </DragDropPad>

        {files.video.preview && (
          <button type="button" onClick={(e) => removeFile(e, "video")}>
            Remove file
          </button>
        )}
      </div>

      <button className="clear-button" type="button" onClick={clearForm}>
        Clear Form
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Save"}
      </button>
    </form>
  );
};

export default PortfolioForm;
