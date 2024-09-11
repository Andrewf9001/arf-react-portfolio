import { useState } from "react";

const PortfolioForm = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [urlText, setUrlText] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form className="portfolio-form-container">
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
          <option value="hobby">Hobbies</option>
          <option value="webDevelopment">Web Development</option>
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
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="upload-wrapper">
        <div className="image-wrapper">
          <h1>Thumbnail Image/Upload</h1>
        </div>

        <div className="image-wrapper">
          <h1>Banner Image/Upload</h1>
        </div>

        <div className="image-wrapper">
          <h1>Logo Image/Upload</h1>
        </div>
      </div>
    </form>
  );
};

export default PortfolioForm;
