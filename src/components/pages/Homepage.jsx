import { projects } from "../../assets/mockData/mockProjects";

const Homepage = () => {
  return (
    <div className="homepage-container">
      {projects.map((project) => {
        return (
          <div className="projects-wrapper" key={project.id}>
            <h3>{project.name}</h3>

            <img height="60px" src={project.image} alt="Project Icon" />
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
