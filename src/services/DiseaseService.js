import axiosInstance from "../api/axiosInstance.js";

const DiseaseService = () => {
    const create = async (payload) => {
        const {data} = await axiosInstance.post('/api/diseases', payload);
        return data;
    }

    const getById = async (id) => {
        const {data} = await axiosInstance.get(`/api/diseases/${id}`);
        return data;
    }

    const getAll = async (params) => {
        const {data} = await axiosInstance.get('/api/diseases', {params});
        return data;
    }

    const update = async (payload) => {
        const {data} = await axiosInstance.put('/api/diseases', payload);
        return data;
    }

    const deleteById = async (id) => {
        const {data} = await axiosInstance.delete(`/api/diseases/${id}`);
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

export default DiseaseService;