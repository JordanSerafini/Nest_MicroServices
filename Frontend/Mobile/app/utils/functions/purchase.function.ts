import { url } from "../url";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchaseDocument } from "../../@types/purchases/PurchaseDocument.entity";

// Fonction pour récupérer le token
const getToken = async () => {
    return await AsyncStorage.getItem("userToken");
  };

  export const getPurchasePaginated = async (
    searchQuery: string,
    limit: number,
    offset: number
  ): Promise<{
    purchaseDocuments: PurchaseDocument[];
    totalPages: number;
    currentPage: number;
  }> => {
    //console.log('Fetching purchases data with query:', searchQuery, 'limit:', limit, 'offset:', offset);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Token not found");
      }
  
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });
      if (searchQuery) {
        queryParams.append("searchQuery", searchQuery);
      }
  
      const response = await fetch(
        `${url.api_gateway}/purchase/paginate?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching paginated purchases:", error);
      throw error;
    }
  };
  
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
        console.error('Error fetching paginated purchase:', error);
        throw error;
    }
}

export const getPurchaseDocumentByCat = async (
    category: string, 
    limit: number, 
    offset: number, 
    searchQuery?: string
  ): Promise<{
    purchaseDocuments: PurchaseDocument[];
    totalPages: number;
    currentPage: number;
  }> => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Token not found');
      }
  
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });
      if (searchQuery) {
        queryParams.append('searchQuery', searchQuery);
      }
  
      const response = await fetch(`${url.api_gateway}/purchase/paginate/${category}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching paginated purchases:', error);
      throw error;
    }
  };
  
  
