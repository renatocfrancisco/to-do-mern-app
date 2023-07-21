import axiosInstance from './axios'

export const login = async (username, password) => {
  return await axiosInstance.post('/login', {
    username,
    password
  }).then((response) => {
    setToken(response.data.accessToken)
    setRefreshToken(response.data.refreshToken)
    return true
  }
  )
    .catch((error) => {
      alert(error.response.data)
      return false
    })
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token)
}

export const logout = async () => {
  await axiosInstance.get('/logout')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
}

export const getTasks = async () => {
  return await axiosInstance.get('/tasks')
}

export const createTask = async (data) => {
  console.log(data)
  return await axiosInstance.post('/tasks', data)
}

export const deleteTask = async (id) => {
  return await axiosInstance.delete(`/tasks/${id}`)
}

export const updateTask = async (id, data) => {
  return await axiosInstance.put(`/tasks/${id}`, data)
}
