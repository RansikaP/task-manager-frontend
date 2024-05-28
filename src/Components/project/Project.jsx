import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './project.css'
import TaskTable from "./TaskTable";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";
import Cookies from 'js-cookie';
import {Button} from 'react-bootstrap'

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
        name: "Design Homepage",
        description: "Create a new design for the homepage",
        creator:"Akash",
        assignedUsers: ["Alice", "Bob"],
        dueDate: "2023-05-30",
        status: "In Progress"
    },
    {
        name: "Fix Bug #123",
        description: "Resolve the issue with login",
        creator:"Akash",
        assignedUsers: ["Charlie"],
        dueDate: "2023-05-25",
        status: "Completed"
    },
    {
        name: "Write Documentation",
        description: "Document the new API endpoints",
        creator:"Akash",
        assignedUsers: ["Diana"],
        dueDate: "2023-06-10",
        status: "Not Started"
    },
    {
        name: "Code Review",
        description: "Review code for the new feature",
        creator:"Akash",
        assignedUsers: ["Alice", "Charlie"],
        dueDate: "2023-05-28",
        status: "In Review"
    }
]);
  const { projectId } = useParams();
  const navigateTo = useNavigate();
const [users] = useState(["Alice", "Bob", "Charlie", "Diana", "Eve"]);
const [showAddModal, setShowAddModal] = useState(false);
const [currentUser,setCurrentUser] = useState();



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = "http://localhost:3000";
  //       const response = await fetch(`${url}/project/getProj/${projectId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.length > 0) {
  //           setSelectedProject(data[0]);
  //           setTasks(data[0].tasks || []);
  //         } else {
  //           navigateTo("/home");
  //         }
  //       } else {
  //         console.error("Error fetching project data:", response.statusText);
  //         navigateTo("/home");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching project data:", error);
  //       navigateTo("/home");
  //     }
  //   };
  //   fetchData();
  //   setSelectedTask(null);
  //   setShowModal(false);
  //   setTasks([]);
  // }, [projectId, navigateTo]);


  useEffect(() => {

    const user = Cookies.get("user");
    setCurrentUser(user)
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000";
        const response = await fetch(`${url}/project/getProj/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setSelectedProject(data);

          //   taskData = [
          //     {
          //         name: "Design Homepage",
          //         description: "Create a new design for the homepage",
          //         creator:"Akash",
          //         assignedUsers: ["Alice", "Bob"],
          //         dueDate: "2023-05-30",
          //         status: "In Progress"
          //     },
          //     {
          //         name: "Fix Bug #123",
          //         description: "Resolve the issue with login",
          //         creator:"Akash",
          //         assignedUsers: ["Charlie"],
          //         dueDate: "2023-05-25",
          //         status: "Completed"
          //     },
          //     {
          //         name: "Write Documentation",
          //         description: "Document the new API endpoints",
          //         creator:"Akash",
          //         assignedUsers: ["Diana"],
          //         dueDate: "2023-06-10",
          //         status: "Not Started"
          //     },
          //     {
          //         name: "Code Review",
          //         description: "Review code for the new feature",
          //         creator:"Akash",
          //         assignedUsers: ["Alice", "Charlie"],
          //         dueDate: "2023-05-28",
          //         status: "In Review"
          //     }
          // ]
          // setTasks(taskData || []);


          } else {
            navigateTo("/home");
          }
        } else {
          console.error("Error fetching project data:", response.statusText);
          navigateTo("/home");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        navigateTo("/home");
      }
    };
    fetchData();
  }, [projectId, navigateTo]);

  const handleDelete = (task) => {
    setTasks(tasks.filter(t => t !== task));
};

const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
};

const handleSave = (editedTask) => {
    setTasks(tasks.map(t => (t.name === editedTask.name ? editedTask : t)));
};

const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
};

const handleAdd = (newTask) => {
  const taskWithCreator = { ...newTask, creator: currentUser };
  setTasks([...tasks, taskWithCreator]);
};

const handleCloseAdd = () => {
  setShowAddModal(false);
};


  return (
    <div>
      {selectedProject ? (
        <div>
          <h1 className="ProjectNameLabel">{selectedProject[0].name}</h1>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Task</Button>
          <TaskTable tasks={tasks} onDelete={handleDelete} onEdit={handleEdit}/>
          {selectedTask && (
                <EditTaskModal
                    show={showModal}
                    handleClose={handleClose}
                    task={selectedTask}
                    handleSave={handleSave}
                    users={users}
                />
            )}
                      <AddTaskModal
            show={showAddModal}
            handleClose={handleCloseAdd}
            handleSave={handleAdd}
            users={users}
          />
        </div>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
}

export default Project;
