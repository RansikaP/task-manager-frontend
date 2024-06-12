import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './project.css'
import TaskTable from './TaskTable'
import EditTaskModal from './EditTaskModal'
import AddTaskModal from './AddTaskModal'
import Cookies from 'js-cookie'
import { Button } from 'react-bootstrap'
import tasksDataGetter from './tasks'

function Project() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [tasks, setTasks] = useState([])
    const { projectId } = useParams()
    const navigateTo = useNavigate()
    const [users, setUsers] = useState([
        'Alice',
        'Bob',
        'Charlie',
        'Diana',
        'Eve',
    ])
    const [showAddModal, setShowAddModal] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const user = Cookies.get('user')
        setCurrentUser(user)
        const fetchData = async () => {
            try {
                const url = 'http://localhost:3000'
                const response = await fetch(
                    `${url}/project/getProj/${projectId}`
                )
                if (response.ok) {
                    const data = await response.json()
                    if (data.length > 0) {
                        setSelectedProject(data)
                    } else {
                        navigateTo('/home')
                    }
                } else {
                    console.error(
                        'Error fetching project data:',
                        response.statusText
                    )
                    navigateTo('/home')
                }
            } catch (error) {
                console.error('Error fetching project data:', error)
                navigateTo('/home')
            }
        }

        const fetchTasks = async () => {
            const tasksData = await tasksDataGetter.getProjectTasks(projectId)
            setTasks(tasksData)
        }

        fetchData()
        fetchTasks()
    }, [projectId, navigateTo])

    const handleDelete = (task) => {
        setTasks(tasks.filter((t) => t !== task))
    }

    const handleEdit = (task) => {
        setSelectedTask(task)
        setShowModal(true)
    }

    const handleSave = (editedTask) => {
        setTasks(
            tasks.map((t) => (t.name === editedTask.name ? editedTask : t))
        )
    }

    const handleClose = () => {
        setShowModal(false)
        setSelectedTask(null)
    }

    const handleAdd = (newTask) => {
        const taskWithCreator = { ...newTask, creator: currentUser }
        setTasks([...tasks, taskWithCreator])
    }

    const handleCloseAdd = () => {
        setShowAddModal(false)
    }

    return (
        <div>
            {selectedProject ? (
                <div>
                    <h1 className="ProjectNameLabel">
                        {selectedProject[0].name}
                    </h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add Task
                    </Button>
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
                </div>
            ) : (
                <p>Loading project data...</p>
            )}
        </div>
    )
}

export default Project
