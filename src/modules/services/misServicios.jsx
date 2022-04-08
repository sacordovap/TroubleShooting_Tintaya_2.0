import axios from "axios";
import { URL_BACKEND } from "../environments/environments";
import { authAxios } from "./axiosHelpers";

export const postCreateData = async (data) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/troubleshooting/create`,
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    return rpta
}

export const getSuperIntendent = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/troubleshooting/getUserTrobuleshooting?type=${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}

export const getEquiment = async () => {
    const rpta = await authAxios.get(`${URL_BACKEND}/equipments/getAll`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}

export const getEquimentById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/equipments/getEspecific/${id}?all=1`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}
//List Reportes

export const getTroubleShooting = async () => {
    const rpta = await authAxios.get(`${URL_BACKEND}/troubleshooting/getAll`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}
export const getTroubleShootingById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/troubleshooting/getEspecific/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}

export const putTroubleshootingUpdate = async (data, id) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/troubleshooting/update/${id}`,
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    return rpta
}

export const deleteTroubleshootingById = async (id) => {

    const rpta = authAxios.delete(`${URL_BACKEND}/troubleshooting/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}

//Search
// Search
export const getSearch = async (id, text) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/troubleshooting/getAll?type=${id}&text=${text}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return rpta
}