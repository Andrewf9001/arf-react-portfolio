import { Link } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";

const Homepage = () => {
  const { hobbies, projects } = useAppData();

  const renderData = (data) => {
    return data?.map((item) => {
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
        <button>Hobbies</button>

        <button>Web Development</button>

        <button>All</button>
      </div>

      <div className="data-wrapper">
        {renderData(hobbies)}
        {renderData(projects)}
      </div>
    </div>
  );
};

export default Homepage;
