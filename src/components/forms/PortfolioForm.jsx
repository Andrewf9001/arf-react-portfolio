import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { db, storage } from "../../services/firebase";

const PortfolioForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [urlText, setUrlText] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const thumbRef = useRef();
  const bannerRef = useRef();
  const logoRef = useRef();
  const videoRef = useRef();

  const clearForm = () => {
    setDescription("");
    setCategory("");
    setUrlText("");
    setName("");
    setUrl("");

    thumbRef.current.value = "";
    bannerRef.current.value = "";
    logoRef.current.value = "";
    videoRef.current.value = "";

    setIsLoading(false);
  };

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

    if (!category) return;

    try {
      const thumbUrl = await handleFile(
        thumbRef.current.files[0],
        "thumbnails"
      );

      const bannerUrl = await handleFile(bannerRef.current.files[0], "banners");
      const logoUrl = await handleFile(logoRef.current.files[0], "logos");
      const videoUrl = await handleFile(videoRef.current.files[0], "videos");

      await addDoc(collection(db, category), {
        name,
        url,
        urlText,
        description,
        thumbUrl,
        bannerUrl,
        logoUrl,
        videoUrl,
      });

      clearForm();
    } catch (e) {
      console.error("Form Submission: ", e);
    }
  };

  return (
    <form className="portfolio-form-container" onSubmit={handleSubmit}>
      <div className="two-column">
        <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="text"
          name="url-text"
          placeholder="URL Link Text"
          value={urlText}
          onChange={(e) => setUrlText(e.target.value)}
        />
      </div>

      <div className="one-column">
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="upload-wrapper">
        <div className="image-wrapper">
          <input ref={thumbRef} type="file" accept="image/*" />
        </div>

        <div className="image-wrapper">
          <input ref={bannerRef} type="file" accept="image/*" />
        </div>

        <div className="image-wrapper">
          <input ref={logoRef} type="file" accept="image/*" />
        </div>

        <div className="video-wrapper">
          <input ref={videoRef} type="file" accept="video/*" />
        </div>
      </div>

      <button>{isLoading ? "Uploading..." : "Save"}</button>
    </form>
  );
};

export default PortfolioForm;
