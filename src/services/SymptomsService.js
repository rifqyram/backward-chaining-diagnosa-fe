import axiosInstance from "../api/axiosInstance.js";

const SymptomsService = () => {
    const create = async (payload) => {
        const {data} = await axiosInstance.post('/api/symptoms', payload);
        return data;
    }

    const getById = async (id) => {
        const {data} = await axiosInstance.get(`/api/symptoms/${id}`);
        return data;
    }

    const getAll = async (params) => {
        const {data} = await axiosInstance.get('/api/symptoms', {params});
        return data;
    }

    const update = async (payload) => {
        const {data} = await axiosInstance.put('/api/symptoms', payload);
        return data;
    }

    const deleteById = async (id) => {
        const {data} = await axiosInstance.delete(`/api/symptoms/${id}`);
        return data;
    }

    return {
        create,
        getById,
        getAll,
        update,
        deleteById
    }
}

export default SymptomsService;