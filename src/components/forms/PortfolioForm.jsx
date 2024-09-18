import { forwardRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import DragDropPad from "../features/dropzone/DragDropPad";

import { db, storage } from "../../services/firebase";

const PortfolioForm = forwardRef((props, refs) => {
  const { data, handleChange, clearForm } = props;
  const { thumbRef, bannerRef, logoRef, videoRef } = refs;

  const [isLoading, setIsLoading] = useState(false);

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

    if (!data.category) return;

    try {
      const thumbUrl = await handleFile(
        thumbRef.current.files[0],
        "thumbnails"
      );

      const bannerUrl = await handleFile(bannerRef.current.files[0], "banners");
      const logoUrl = await handleFile(logoRef.current.files[0], "logos");
      const videoUrl = await handleFile(videoRef.current.files[0], "videos");

      await addDoc(collection(db, data.category), {
        name: data.name,
        url: data.url,
        urlText: data.urlText,
        description: data.description,
        category: data.category,
        thumbUrl,
        bannerUrl,
        logoUrl,
        videoUrl,
      });

      clearForm();
      setIsLoading(false);
    } catch (e) {
      console.error("Form Submission: ", e);
      setIsLoading(false);
    }
  };

  return (
    <form className="portfolio-form-container" onSubmit={handleSubmit}>
      <div className="two-column">
        <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={data.name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <select
          name="category"
          value={data.category}
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
          value={data.url}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <input
          type="text"
          name="urlText"
          placeholder="URL Link Text"
          value={data.urlText}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>

      <div className="one-column">
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          value={data.description}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>

      <div className="upload-wrapper">
        <DragDropPad accept="image/*">
          <div>Thumb Image</div>
        </DragDropPad>

        <DragDropPad accept="image/*">
          <div>Banner Image</div>
        </DragDropPad>

        <DragDropPad accept="image/*">
          <div>Logo Image</div>
        </DragDropPad>

        <DragDropPad accept="video/*">
          <div>Video</div>
        </DragDropPad>
      </div>

      <button disabled={isLoading}>
        {isLoading ? "Uploading..." : "Save"}
      </button>
    </form>
  );
});

export default PortfolioForm;
