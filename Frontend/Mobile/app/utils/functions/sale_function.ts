import { url } from "../url";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    return await AsyncStorage.getItem("userToken");
  };

  export const getSalePaginated = async (searchQuery: string, limit: number, offset: number) => {
    try {
        const token = await getToken();
        if (!token) {
            const error = new Error('Token not found');
            throw error;
        }

        const response = await fetch(`${url.api_gateway}/sale/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = new Error('Network response was not ok');
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching paginated sales:', error);
        throw error;
    }
};

export const getSaleById = async (DocumentId: string) => {
    try {
        const token = await getToken();
        if (!token) {
            const error = new Error('Token not found');
            throw error;
        }

        const response = await fetch(`${url.api_gateway}/sale/${DocumentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = new Error('Network response was not ok');
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching sale by Id:', error);
        throw error;
    }
};

export const getLineByDocumentId = async (DocumentId: string) => {
    try {
        const token = await getToken();
        if (!token) {
            const error = new Error('Token not found');
            throw error;
        }

        const response = await fetch(`${url.api_gateway}/sale/${DocumentId}/lines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = new Error('Network response was not ok');
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching line by DocumentId:', error);
        throw error;
    }
}