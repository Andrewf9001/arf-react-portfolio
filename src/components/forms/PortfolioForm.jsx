import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import DragDropPad from "../features/dropzone/DragDropPad";

import { db, storage } from "../../services/firebase";
import { useAppData } from "../../context/AppDataContext";

const PortfolioForm = (props) => {
  const { files, formData, clearForm, handleChange, handleFileUpload } = props;
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
      const thumbUrl = formData.id
        ? files.thumb.preview
        : files.thumb.file
        ? await handleFile(files.thumb.file, "thumbnails")
        : null;

      const bannerUrl = formData.id
        ? files.banner.preview
        : files.banner.file
        ? await handleFile(files.banner.file, "banners")
        : null;

      const logoUrl = formData.id
        ? files.logo.preview
        : files.logo.file
        ? await handleFile(files.logo.file, "logos")
        : null;

      const videoUrl = formData.id
        ? files.video.preview
        : files.video.file
        ? await handleFile(files.video.file, "videos")
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

    // try {

    //   await addDoc(collection(db, data.category), {
    //     name: data.name,
    //     url: data.url,
    //     urlText: data.urlText,
    //     description: data.description,
    //     category: data.category,
    //     thumbUrl,
    //     bannerUrl,
    //     logoUrl,
    //     videoUrl,
    //   });

    //   clearForm();
    //   setIsLoading(false);
    // }
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
      </div>

      <button disabled={isLoading}>
        {isLoading ? "Uploading..." : "Save"}
      </button>
    </form>
  );
};

export default PortfolioForm;
