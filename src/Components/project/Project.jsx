import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./project.css";
import TaskTable from "./TaskTable";

import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";
import RemoveCollaboratorModal from "./RemoveCollabModal";

import Cookies from "js-cookie";
import tasksDataGetter from "./tasks";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import projectService from "../../services/project";
import encryptionService from "../../services/encryption";
import userService from "../../services/user";



function Project(props) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  let { projectId } = useParams();
  projectId = encryptionService.decryptMessage(projectId);
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const { reloadSidebar } = props;

  const [isCreator, setIsCreator] = useState(false);
  const [projectCollaborators, setProjectCollaborators] = useState();

  useEffect(() => {
    const user = Cookies.get("user");
    setCurrentUser(user);
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000";
        const response = await fetch(`${url}/project/getProj/${projectId}`);

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setSelectedProject(data[0]);
          } else {
            navigateTo("/home");
          }
          //if user goes to page after deleting or leaving the project
          if (
            data[0].creator != user &&
            !data[0].collaborators.includes(user)
          ) {
            navigateTo("/home");
          }

          //sets page functions specific for project owners
          if (data[0].creator == user) {
            setIsCreator(true);
          } else {
            setIsCreator(false);
          }
          const collabIds = data[0].collaborators

          const collabData = await userService.getCollabUsers(collabIds);
          setProjectCollaborators(collabData)

        
        } else {
          console.error("Error fetching project data:", response.statusText);
          navigateTo("/home");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        navigateTo("/home");
      }
    };

    const fetchTasks = async () => {
      const tasksData = await tasksDataGetter.getProjectTasks(projectId);
      setTasks(tasksData);
    };



    fetchData();
    fetchTasks();
  }, [projectId, navigateTo]);

const updateCollaborators = async(collabIds)=>{
  const collabData = await userService.getCollabUsers(collabIds);
  setProjectCollaborators(collabData)
}



  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleSave = (editedTask) => {
    setTasks(tasks.map((t) => (t.name === editedTask.name ? editedTask : t)));
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

  const handleRemove = async(selectedUsers) => {
    const updatedProject = await projectService.removeCollaborators(projectId,selectedUsers);
    setSelectedProject(updatedProject)
    updateCollaborators(updatedProject.collaborators)
  };

  const handleRemoveClose = () => {
    setShowRemoveModal(false);
  };

  const DeleteProject = async () => {
    await projectService.deleteProject(selectedProject._id);
    reloadSidebar();
    navigateTo("/home");
  };

  const LeaveProject = async () => {
    console.log(currentUser);
    console.log(selectedProject._id);
    await projectService.leaveProject(currentUser, selectedProject._id);
    reloadSidebar();
    navigateTo("/home");
  };

  return (
    <div>
      {selectedProject ? (
        <div>
          <h1 className="ProjectNameLabel">{selectedProject.name}</h1>

          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add Task
            </Button>
            {isCreator && (
              <Button
                className="btn btn-warning"
                onClick={() => setShowRemoveModal(true)}
              >
                Remove Collaborators
              </Button>
            )}

            {isCreator && (
              <Button variant="danger" onClick={DeleteProject}>
                Delete Project
              </Button>
            )}
            {!isCreator && (
              <Button variant="danger" onClick={LeaveProject}>
                Leave Project
              </Button>
            )}
          </div>
          <TaskTable
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
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
            projectId={projectId}
          />
          <RemoveCollaboratorModal
            show={showRemoveModal}
            handleRemove={handleRemove}
            handleRemoveClose={handleRemoveClose}
            users={projectCollaborators}
          />
        </div>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
}

export default Project;
