import axiosInstance from "../api/axiosInstance.js";

const RuleService = () => {
    const create = async (payload) => {
        const {data} = await axiosInstance.post('/api/rules', payload);
        return data;
    }

    const getById = async (id) => {
        const {data} = await axiosInstance.get(`/api/rules/${id}`);
        return data;
    }

    const getAll = async (params) => {
        const {data} = await axiosInstance.get('/api/rules', {params});
        return data;
    }

    const update = async (payload) => {
        const {data} = await axiosInstance.put('/api/rules', payload);
        return data;
    }

    const deleteById = async (id) => {
        const {data} = await axiosInstance.delete(`/api/rules/${id}`);
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

export default RuleService;