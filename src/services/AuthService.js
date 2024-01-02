import axiosInstance from "../api/axiosInstance.js";

const AuthService = () => {
    const login = async (payload) => {
        const {data} = await axiosInstance.post('/api/auth/login', payload)
        return data;
    }

    const register = async (payload) => {
        const {data} = await axiosInstance.post('/api/auth/register', payload)
        return data;
    }

    const createUser = async (payload) => {
        const {data} = await axiosInstance.post('/api/users', payload)
        return data;
    }

    const getUserInfo =  async () => {
        const {data} = await axiosInstance.get(`/api/users/me`);
        return data;
    }

    const getUserById =  async (id) => {
        const {data} = await axiosInstance.get(`/api/users/${id}`);
        return data;
    }

    const getAll =  async (params) => {
        const {data} = await axiosInstance.get(`/api/users`, {params});
        return data;
    }

    const update =  async (payload) => {
        const {data} = await axiosInstance.put(`/api/users`, payload);
        return data;
    }

    const deleteById =  async (id) => {
        const {data} = await axiosInstance.delete(`/api/users/${id}`);
        return data;
    }

    const logout = () => {
        sessionStorage.removeItem('token');
    }

    const setToken = (token) => {
        sessionStorage.setItem('token', token);
    }

    return {
        login,
        register,
        createUser,
        getUserInfo,
        getUserById,
        getAll,
        update,
        deleteById,
        setToken,
        logout
    }
}

export default AuthService;