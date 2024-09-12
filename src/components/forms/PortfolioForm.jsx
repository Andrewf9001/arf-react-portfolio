import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { db, storage } from "../../services/firebase";

const PortfolioForm = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [urlText, setUrlText] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setDescription("");
    setCategory("");
    setUrlText("");
    setName("");
    setUrl("");
    setBannerImage(null);
    setThumbImage(null);
    setLogoImage(null);
    setVideo(null);
    setIsLoading(false);
  };

  const uploadToStorage = async (file, path) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!category) return;

    try {
      const videoUrl = video ? await uploadToStorage(video, "videos") : null;
      const thumbUrl = thumbImage
        ? await uploadToStorage(thumbImage, "thumbnails")
        : null;

      const bannerUrl = bannerImage
        ? await uploadToStorage(bannerImage, "banners")
        : null;

      const logoUrl = logoImage
        ? await uploadToStorage(logoImage, "logos")
        : null;

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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbImage(e.target.files[0])}
          />
        </div>

        <div className="image-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files[0])}
          />
        </div>

        <div className="image-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoImage(e.target.files[0])}
          />
        </div>

        <div className="video-wrapper">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
      </div>

      <button>{isLoading ? "Uploading..." : "Save"}</button>
    </form>
  );
};

export default PortfolioForm;
