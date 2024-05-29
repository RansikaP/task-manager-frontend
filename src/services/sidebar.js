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
        console.error('Error occurred during login:', error)
    }
}

const getCollabProjects = async () => {
    const requestUrl = baseUrl + 'collabProjects/' + username
    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occurred during login:', error)
    }
}

export default { getMyProjects, getCollabProjects }
