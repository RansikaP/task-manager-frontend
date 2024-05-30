import axios from 'axios'
import Cookies from 'universal-cookie'

const baseUrl = 'http://localhost:3000/project/'
const cookies = new Cookies()
const username = cookies.get('user')

const getMyProjects = async () => {
    const requestUrl = baseUrl + 'myProjects/' + username
    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

const getCollabProjects = async () => {
    const requestUrl = baseUrl + 'collabProjects/' + username
    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

const createProject = async (title, desc) => {
    const requestUrl = baseUrl
    const newProjectObj = {
        name: title,
        creator: username,
        description: desc,
    }

    try {
        const response = await axios.post(requestUrl, newProjectObj)
        return response.data
    } catch (error) {
        console.error('Error occurred during project creation:', error)
    }
}

export default { getMyProjects, getCollabProjects, createProject }
