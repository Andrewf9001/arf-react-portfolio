import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { useAppData } from "../../context/AppDataContext";

const Homepage = () => {
  const [filter, setFilter] = useState("");
  const { hobbies, projects } = useAppData();

  const portfolioData = useMemo(() => {
    if (hobbies && projects) {
      const data = [...hobbies, ...projects];

      if (!filter) return data;
      else if (filter === "hobbies") {
        return data.filter((item) => item.category === "Hobbies");
      } else if (filter === "projects") {
        return data.filter((item) => item.category === "Projects");
      }
    }
  }, [filter, hobbies, projects]);

  const renderData = () => {
    return portfolioData?.map((item) => {
      return (
        <Link
          className="item-wrapper"
          to={`/project/${item.category}/${item.id}`}
          key={item.id}
        >
          <div className="portfolio-item-wrapper">
            <div
              className="thumbnail"
              style={{ backgroundImage: `url(${item.thumbUrl})` }}
            />

            <div className="logo-wrapper">
              <img
                className="logo"
                src={item.logoUrl}
                alt={`${item.name} Logo`}
              />
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="homepage-container">
      <div className="filter-buttons-wrapper">
        <button onClick={() => setFilter("hobbies")}>Hobbies</button>

        <button onClick={() => setFilter("projects")}>Web Development</button>

        <button onClick={() => setFilter("")}>All</button>
      </div>

      <div className="data-wrapper">{renderData()}</div>
    </div>
  );
};

export default Homepage;
