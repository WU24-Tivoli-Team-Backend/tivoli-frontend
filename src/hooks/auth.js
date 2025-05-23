import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const [jwt, setJwt] = useState(null)

    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        '/api/user',
        async () => {
            try {
                const res = await axios.get('/api/user')
                return res.data
            } catch (error) {
                if (error.response?.status === 401) return null
                if (error.response?.status === 409) {
                    router.push('/verify-email')
                    return
                }
                throw error
            }
        },
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false,
        },
    )

    const csrf = async () => {
        try {
            // Make the request to get the CSRF cookie
            const response = await axios.get('/sanctum/csrf-cookie')

            // Check if we can get the CSRF token from the cookies
            const csrfToken = getCsrfToken() // Using the function from my previous message

            // Log the result
            if (csrfToken) {
                console.log(
                    'CSRF token successfully retrieved:',
                    csrfToken.substring(0, 10) + '...',
                )
                return true
            } else {
                console.warn(
                    'CSRF endpoint accessed, but no CSRF token found in cookies',
                )
                console.log('All cookies:', document.cookie)

                // Check response headers for Set-Cookie
                console.log('Response status:', response.status)
                console.log('Response headers:', response.headers)

                return false
            }
        } catch (error) {
            console.error('Error retrieving CSRF token:', error)
            return false
        }
    }

    // Helper function to extract CSRF token from cookies
    function getCsrfToken() {
        // Function to get a specific cookie value by name
        function getCookie(name) {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) {
                return parts.pop().split(';').shift()
            }
            return null
        }

        // Get the CSRF token - try both standard and Laravel prefixed names
        let token = getCookie('XSRF-TOKEN')

        // For Laravel 12, also check for prefixed cookies
        if (!token) {
            token = getCookie('laravel_XSRF-TOKEN')
        }

        // Decode URI components if token exists
        return token ? decodeURIComponent(token) : ''
    }

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        localStorage.removeItem('jwt')
        console.log('Old JWT token removed before login.')

        const csrfSuccess = await csrf()

        if (!csrfSuccess) {
            setStatus(
                'Unable to establish a secure connection. CSRF token not received.',
            )
            return
        }

        const csrfToken = getCsrfToken()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props, {
                withCredentials: true,
                'X-XSRF-TOKEN': csrfToken,
            })
            .then(() => {
                mutate()

                axios
                    .get('/api/jwt-token', {
                        withCredentials: true,
                    })
                    .then(res => {
                        const token = res.data.token
                        localStorage.setItem('jwt', token)
                        setJwt(token)
                    })
                    .catch(err => {
                        console.error('Could not find JWT-token:', err)
                    })
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)
                } else if (error.response?.status === 419) {
                    console.error(
                        'CSRF token mismatch. Trying to refresh token...',
                    )
                    // Attempt to refresh CSRF token and try again
                    csrf()
                    setStatus('Please try again, refreshing security token...')
                } else {
                    console.error('Login error:', error)
                }
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate(null))
        }

        localStorage.removeItem('jwt')
        console.log('JWT token removed during logout.')

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        jwt,
    }
}
