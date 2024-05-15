import axios from 'axios'

const baseUrl = 'http://localhost:3000/'

const login = async (email, password) => {
    const requestUrl = baseUrl + 'user/login'
    const requestData = {email, password}
    try {
        const response = await axios.post(requestUrl, requestData)
        return response.data
    } catch (error) {
        console.error('Error occurred during login:', error)
    }
}

const register = async (email, password, name) => {
    const requestUrl = baseUrl + 'user/register'
    const requestData = {email, password, name}
    try {
        const reponse = await axios.post(requestUrl, requestData)
        return reponse.data
    } catch (error) {
        console.error('Error occurred during registration:', error)
    }
}

export default { login, register }