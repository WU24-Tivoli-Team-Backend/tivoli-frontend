import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,  // Send cookies with each request (important for CSRF)
})

// Add a request interceptor to include the CSRF token automatically
axios.interceptors.request.use((config) => {
    // Get CSRF token from cookies (make sure it exists)
    const xsrfToken = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('XSRF-TOKEN='))
        ?.split('=')[1]

    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = xsrfToken  // Send the token with the request
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default axios
