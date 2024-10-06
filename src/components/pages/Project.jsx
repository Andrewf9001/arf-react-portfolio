import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppData } from "../../context/AppDataContext";

const Project = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { type, projectId } = useParams();
  const { getProjectData } = useAppData();

  useEffect(() => {
    getProjectData(projectId, type)
      .then((data) => setData(data))
      .catch((err) => console.error("Get Project: ", err))
      .finally(() => setIsLoading(false));
  }, [projectId, type, getProjectData]);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div>Loading...</div>
        <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
      </div>
    );
  }

  return (
    <div className="project-container">
      <h1>{data?.name}</h1>

      <img className="banner" src={data?.bannerUrl} alt="Project Banner" />

      {data?.url && (
        <div className="project-link-wrapper">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${data.url}`}
          >
            {data.urlText}
          </a>
        </div>
      )}

      <p>{data?.description}</p>

      {data?.videoUrl && <video controls src={data.videoUrl} />}
    </div>
  );
};

export default Project;
