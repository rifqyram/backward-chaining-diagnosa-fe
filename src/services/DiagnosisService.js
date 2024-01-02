import axiosInstance from "../api/axiosInstance.js";

const DiagnosisService = () => {
    const create = async (payload) => {
        const {data} = await axiosInstance.post('/api/diagnosis', payload);
        return data;
    }

    const getById = async (id) => {
        const {data} = await axiosInstance.get(`/api/diagnosis/${id}`);
        return data;
    }

    const getAll = async (params) => {
        const {data} = await axiosInstance.get(`/api/diagnosis`, {params});
        return data;
    }

    const getByCurrentUser = async (params) => {
        const {data} = await axiosInstance.get(`/api/diagnosis/me`, {params});
        return data;
    }

    return {
        create,
        getById,
        getAll,
        getByCurrentUser
    }
}

export default DiagnosisService;