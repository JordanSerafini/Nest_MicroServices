import { url } from "../url";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchaseDocument } from "../../@types/purchases/PurchaseDocument.entity";

// Fonction pour récupérer le token
const getToken = async () => {
    return await AsyncStorage.getItem("userToken");
  };

  export const getPurchasePaginated = async (searchQuery: string, limit: number, offset: number): Promise<PurchaseDocument> => {
    try {
        const token = await getToken();
        if (!token) {
            const error = new Error('Token not found');
            throw error;
        }

        const response = await fetch(`${url.api_gateway}/purchase/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
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
        console.error('Error fetching paginated deals:', error);
        throw error;
    }
}

export const getPurchaseById = async (DocumentId: string): Promise<PurchaseDocument> => {
    try {
        const token = await getToken();
        if (!token) {
            const error = new Error('Token not found');
            throw error;
        }

        const response = await fetch(`${url.api_gateway}/purchase/${DocumentId}`, {
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
        console.error('Error fetching paginated deals:', error);
        throw error;
    }
}