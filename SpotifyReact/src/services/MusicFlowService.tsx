import axios from 'axios';

const API_URL = 'http://localhost:5158/api';

export const getTrackById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/Tracks/GetById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching track by ID:', error);
        return null;
    }
};

export const getTracks = async () => {
    try {
        const response = await axios.get(`${API_URL}/Tracks/GetAll`); // Ваша кінцева точка для отримання всіх треків
        return response.data;
    } catch (error) {
        console.error('Error fetching tracks:', error);
        throw error;
    }
};