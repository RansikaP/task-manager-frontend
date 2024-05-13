import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projectId } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000";
        const response = await fetch(`${url}/project/getProj/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setSelectedProject(data);
          } else {
            navigateTo('/home');
          }
        } else {
          console.error("Error fetching project data:", response.statusText);
          navigateTo('/home');
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        navigateTo('/home');
      }
    };
    fetchData();
  }, [projectId, navigateTo]);

  return (
    <div>
      {selectedProject ? (
        <div>
          <h1>{selectedProject[0].name}</h1>
        </div>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
}

export default Project;