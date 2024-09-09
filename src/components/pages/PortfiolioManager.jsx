// import PortfolioSidebar from "../features/PortfolioSidebar";
// import PortfolioForm from "../forms/PortfolioForm";

const PortfolioManager = () => {
  return (
    <div className="portfolio-manager-container">
      <div className="left-column">{/* <PortfolioForm /> */}</div>

      <div className="right-column">{/* <PortfolioSidebar /> */}</div>
    </div>
  );
};

export default PortfolioManager;

/* 
  TODO:
    - What can I do in the dashboard?
      - Navigate to form section to add new item
        - Rich text editor
        - Image uploads
        - Video uploads
        - Thumbnail, Banner, Images
      - Activate / Deactivate which projects to show
      - Update the About page (or any page with details) possibly
*/
