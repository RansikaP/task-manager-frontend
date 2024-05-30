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
        console.log('response: ', response.data)
        return response.data
    } catch (error) {
        console.log('Error occured while retreving tasks:', error)
    }
}

export default { getMyTasks, getProjectTasks }
