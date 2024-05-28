import React, { useState } from 'react'
import './HomePage.css'
import Cookies from 'universal-cookie'
import { ImportantTasks, UpcomingTasks } from './Data'

function Home() {
    const [projectName, setProjectName] = useState('')
    const [projectCreator, setProjectCreator] = useState('')

    const [projectTitle, setProjectTite] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const cookies = new Cookies()
    const username = cookies.get('user')

    const handleName = (event) => {
        setProjectName(event.target.value)
    }

    const handleCreator = (event) => {
        setProjectCreator(event.target.value)
    }

    const handleTitle = (event) => {
        setProjectTitle(event.target.value)
    }

    const handleDescription = (event) => {
        setProjectDescription(event.target.value)
    }
    const handleProjectSubmit = (event) => {
        event.preventDefault()
        console.log('Form submission:', { projectTitle, projectDescription })
    }
    const handleJoinSubmit = (event) => {
        event.preventDefault()
        console.log('Form submission:', { projectName, projectCreator })
    }

    return (
        <div className="HomePagecontainer">
            <h1>Welcome {username}</h1>
            <div className="main-content">
                <div className="tasks-container">
                    <h2 className="label1-color">Tasks Due Soon!!!</h2>
                    <div className="cards">
                        {ImportantTasks.map((task, i) => (
                            <div
                                key={i}
                                className="card"
                            >
                                <h3>Task: {task.name}</h3>
                                <h4>Project: {task.Project}</h4>
                                <h5>Due Date: {task.date}</h5>
                            </div>
                        ))}
                    </div>

                    <h2 className="label2-color">Tasks Due This Week</h2>
                    <div className="cards">
                        {UpcomingTasks.map((task, i) => (
                            <div
                                key={i}
                                className="cardUpcoming"
                            >
                                <h3>Task: {task.name}</h3>
                                <h4>Project: {task.Project}</h4>
                                <p>Due Date: {task.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="formscontainer">
                <div className="form-box">
                    <form onSubmit={handleProjectSubmit}>
                        <label>Create A New Project</label>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={projectTitle}
                                onChange={handleTitle}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={projectDescription}
                                onChange={handleDescription}
                            />
                        </label>
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
                <div className="form-box">
                    <form onSubmit={handleJoinSubmit}>
                        <label>Join An Existing Project</label>
                        <label>
                            Creator:
                            <input
                                type="text"
                                value={projectCreator}
                                onChange={handleCreator}
                            />
                        </label>
                        <label>
                            Project Name:
                            <input
                                type="text"
                                value={projectName}
                                onChange={handleName}
                            />
                        </label>
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
