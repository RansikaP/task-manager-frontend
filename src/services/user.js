import axios from 'axios'

const baseUrl = 'http://localhost:3000/user/'

const login = async (email, password) => {
    const requestUrl = baseUrl + 'login'
    const requestData = { email, password }
    try {
        const response = await axios.post(requestUrl, requestData)
        return response.data
    } catch (error) {
        console.error('Error occurred during login:', error)
    }
}

const register = async (email, password, name) => {
    const requestUrl = baseUrl + 'register'
    const requestData = { email, password, name }
    try {
        const reponse = await axios.post(requestUrl, requestData)
        return reponse.data
    } catch (error) {
        console.error('Error occurred during registration:', error)
    }
}

const getUserInfo = async (userId) => {
    const requestUrl = baseUrl + userId

    try {
        const response = await axios.get(requestUrl)
        return response.data
    } catch (error) {
        console.error('Error occured getting user informations')
    }
}

export default { login, register, getUserInfo }
