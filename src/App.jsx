import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Home from './Components/HomePage';
import Project from './Components/Project';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='container'> 
          <Sidebar /> 
          <div className='content'>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/project/:projectId' element={<Project />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

// function ProjectContainer() {
//   const [selectedProject, setSelectedProject] = useState(null); 
//   const { projectId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = "http://localhost:3000";
//         const response = await fetch(url + "/project/getProj/" + projectId);
//         const data = await response.json();
//         console.log("Project data ");
//         console.log(data);
//         setSelectedProject(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [projectId]); // Added projectId as dependency to useEffect

//   return (
//     <Project selectedProject={selectedProject} />
//   );
// }

export default App;