import axios from 'axios'
import Cookies from 'universal-cookie'
import toast from "react-hot-toast";

const baseUrl = 'http://localhost:3000/project/'
const cookies = new Cookies()
// const username = cookies.get('user')

const getMyProjects = async () => {
    const username = cookies.get('user')
    const requestUrl = baseUrl + 'myProjects/' + username
    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

const getCollabProjects = async () => {
    const username = cookies.get('user')
    const requestUrl = baseUrl + 'collabProjects/' + username
    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

const deleteProject = async(projId)=>{
    const requestUrl = baseUrl+'delete/'+ projId
    try {
        const response = await axios.delete(requestUrl)
    } catch (error) {
        console.error('Error occurred:', error)
    }

}

const leaveProject = async(collab, projId)=>{
    const requestUrl = baseUrl+"removeCollaborator";
    const removeCollabObj = {
       id: projId,
       collaborator: collab
    }    
    try {
        const response = await axios.put(requestUrl, removeCollabObj)
    
    } catch (error) {
        console.error('Error occurred:', error)
    }

}


const createProject = async (title, desc) => {
    const username = cookies.get('user')
    const requestUrl = baseUrl
    const newProjectObj = {
        name: title,
        creator: username,
        description: desc,
    }
    console.log(username)
    try {
        const response = await axios.post(requestUrl, newProjectObj)
        return response.data
    } catch (error) {
        console.error('Error occurred during project creation:', error)
        if (error.response && error.response.status === 404) {
            toast.error("Create A Project With A UNIQUE Name");
        }
    }
}

export default { getMyProjects, getCollabProjects, createProject ,deleteProject,leaveProject}
