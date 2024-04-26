import axios from 'axios'
import { useEffect } from 'react'
import { useAuthStore } from 'src/store/store'

const axiosPrivate = axios.create({
  baseURL: 'https://api.intra.42.fr/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})

const useAxiosPrivate = () => {
  const { token, refreshToken } = useAuthStore()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token?.access_token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refreshToken()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [token, refreshToken])

  return axiosPrivate
}

export default useAxiosPrivate
