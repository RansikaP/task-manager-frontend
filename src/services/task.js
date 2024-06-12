import axios from 'axios'
import Cookies from 'universal-cookie'

const baseUrl = 'http://localhost:3000/task/'
const cookies = new Cookies()
const username = cookies.get('user')

const getMyTasks = async () => {
    const request = baseUrl + 'getUserTasks/' + username
    try {
        const response = await axios.get(request)
        return response.data
    } catch (error) {
        console.log('Error occured while retreving tasks:', error)
    }
}

const getProjectTasks = async (projectId) => {
    const request = baseUrl + 'getProjectTasks/' + projectId
    try {
        const response = await axios.get(request)
        return response.data
    } catch (error) {
        console.log('Error occured while retreving tasks:', error)
    }
}

const updateTask = async (id, task) => {
    const request = baseUrl + id
    try {
        const response = await axios.put(request, task)
        return response
    } catch (error) {
        console.log('Error occured while updating task: ', error)
    }
}

const deleteTask = async (id) => {
    const request = baseUrl + id
    try {
        const response = await axios.delete(request)
        return response
    } catch (error) {
        console.log('Error occured while deleting task: ', error)
    }
}

const addTask = async (task) => {
    const request = baseUrl
    try {
        const response = await axios.post(request, task)
        return response
    } catch (error) {
        console.log('Error occured while creating task: ', error)
    }
}

export default { getMyTasks, getProjectTasks, updateTask, deleteTask, addTask }
