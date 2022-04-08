import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import React from 'react'

export const authAxios = axios.create({
    //esta variable me ayuda a brindarle el header authorization token a todas las consultas por medio de su interceptors, 
    // creo que si le hacía al axios de frente tendría que hacer para cada uno de los servicios, por eso mejor lo creo aquí
})

authAxios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});