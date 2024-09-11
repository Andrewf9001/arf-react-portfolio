const PortfolioForm = () => {
  return (
    <form className="portfolio-form-container">
      <div className="two-column">
        <input type="text" /> {/* name */}
        <select>
          <option>Hobbies</option>
          <option>Web Development</option>
        </select>
      </div>

      <div className="two-column">
        <input type="text" /> {/* url */}
        <input type="text" /> {/* url display text */}
      </div>

      <div className="one-column">
        <input type="text" /> {/* description */}
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
