import axios from 'axios'

const baseUrl = 'http://localhost:3000/'

const login = (email, password) => {
    const requestUrl = baseUrl + 'user/login'
    const requestData = {email, password}
    console.log(requestData)
    console.log(requestUrl)
    return axios.post(requestUrl, requestData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error occurred during login:', error);            
        });
}

export default { login }