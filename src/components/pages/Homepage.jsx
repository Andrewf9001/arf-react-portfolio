import { Link } from "react-router-dom";
import { projects } from "../../assets/mockData/mockProjects";

const Homepage = () => {
  return (
    <div className="homepage-container">
      {projects.map((project) => {
        return (
          <div className="projects-wrapper" key={project.id}>
            <div className="name-image-wrapper">
              <img height="60px" src={project.image} alt="Project Icon" />

              <Link to={`/project/${project.id}`}>
                <h3>{project.name}</h3>
              </Link>
            </div>

            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
