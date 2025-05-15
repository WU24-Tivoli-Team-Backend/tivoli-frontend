import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Add a request interceptor to include CSRF token with Laravel 12 compatibility
axios.interceptors.request.use(function (config) {
  // Get the CSRF token from cookie
  // Laravel 12 changes the cookie prefixing in some configurations
  let token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]
  
  // Fallback check for prefixed cookies (Laravel 12 may use these in some setups)
  if (!token) {
    token = document.cookie
      .split('; ')
      .find(row => row.startsWith('laravel_XSRF-TOKEN='))
      ?.split('=')[1]
  }
  
  if (token) {
    // Laravel 12 still accepts the token in the X-XSRF-TOKEN header
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token)
  }
  
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios