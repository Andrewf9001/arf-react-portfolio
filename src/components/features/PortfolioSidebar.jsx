import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppData } from "../../context/AppDataContext";

const PortfolioSidebar = ({ setPorfolioItem }) => {
  const { hobbies, projects, getProjectData } = useAppData();

  const getPortfolioItem = (id, category) => {
    const getProjects = getProjectData(id, category);

    getProjects.then((data) => setPorfolioItem(id, data));
  };

  const renderData = (data) => {
    return data?.map((item) => {
      return (
        <div className="portfolio-item-wrapper" key={item.id}>
          <img
            src={item.thumbUrl}
            alt={`${item.name} thumbnail`}
            className="thumb-image"
          />

          <div className="text-content">
            <div className="name">{item.name}</div>

            <div className="actions-wrapper">
              <button
                className="edit"
                onClick={() => getPortfolioItem(item.id, item.category)}
              >
                <FontAwesomeIcon icon="fa-solid fa-edit" />
              </button>

              <button className="delete">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="portfolio-sidebar-container">
      {renderData(hobbies)}
      {renderData(projects)}
    </div>
  );
};

export default PortfolioSidebar;
