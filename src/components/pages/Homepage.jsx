import { Link } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";

const Homepage = () => {
  const [itemClassName, setItemClassName] = useState("");
  const { hobbies, projects } = useAppData();

  const renderData = (data) => {
    return data?.map((item) => {
      return (
        <Link className="item-wrapper" to={`/project/${item.id}`}>
          <div
            className="portfolio-item-wrapper"
            onMouseEnter={() => setItemClassName("image-blur")}
            onMouseLeave={() => setItemClassName("")}
          >
            <img src={item.thumbUrl} alt={`${item.name} Thumbnail`} />
            <img src={item.thumbUrl} alt={`${item.name} Logo`} />

            <div className="subtitle">{item.description}</div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="homepage-container">
      {renderData(hobbies)}
      {renderData(projects)}
    </div>
  );
};

export default Homepage;
