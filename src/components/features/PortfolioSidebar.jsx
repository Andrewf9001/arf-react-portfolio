import { useAppData } from "../../context/AppDataContext";

const PortfolioSidebar = () => {
  const { hobbies, projects } = useAppData();

  const renderData = (data) => {
    return data.map((item) => {
      return (
        <div className="portfolio-item-wrapper">
          <img
            src={item.thumbUrl}
            alt={`${item.name} thumbnail`}
            className="thumb-image"
          />

          <div className="text-content">
            <div className="name">{item.name}</div>

            <div className="buttons-wrapper">
              <button className="edit">Edit Fontawesome Icon</button>
              <button className="delete">Trash Fontawesome Icon</button>
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
