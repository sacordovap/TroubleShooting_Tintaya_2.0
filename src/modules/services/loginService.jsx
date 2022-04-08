import axios from 'axios'
import { URL_BACKEND } from '../environments/environments'

export const postLogin = async (login) => {
    const rpta = await axios.post(`${URL_BACKEND}/login`, JSON.stringify(login), {
        headers: { "Content-type": "application/json" }
    });
    return rpta
}

