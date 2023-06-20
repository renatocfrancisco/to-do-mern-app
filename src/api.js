import axiosInstance from "./axios";

export const login = (username, password) => {
    return axiosInstance.post("/login", {
        username,
        password,
    });
}

export const getUsers = () => {
    return axiosInstance.get("/user");
}

export const getTasks = () => {
    return axiosInstance.get("/task");
}

export const updateTask = (id, data) => {
    return axiosInstance.put(`/task/${id}`, data);
}

export const createTask = (data) => {
    return axiosInstance.post("/task", data);
}

export const deleteTask = (id) => {
    return axiosInstance.delete(`/task/${id}`);
}

export const updateUser = (id, data) => {
    return axiosInstance.put(`/user/${id}`, data);
}

export const deleteUser = (id) => {
    return axiosInstance.delete(`/user/${id}`);
}
