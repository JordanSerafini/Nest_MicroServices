import { url } from "../url";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

// Récupérer un document de stock avec ses détails et les lignes associées
export const getStockDocByIDFull = async (DocumentId: string) => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/details/${DocumentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Récupérer un document de stock par son ID
export const getStockDocByID = async (DocumentId: string) => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/document/${DocumentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Récupérer les documents de stock paginés
export const getStockDocPaginated = async (limit: number, offset: number, searchQuery = "") => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/paginate?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Récupérer tous les entrepôts
export const getStorehouse = async () => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/storehouses`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Récupérer le nom d'un entrepôt par son ID
export const getStorehouseNameById = async (id: string) => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/storehouse/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.Caption;
}

// Récupérer les lignes d'un document de stock par DocumentId
export const getStockDocLine = async (DocumentId: string) => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/document-lines/${DocumentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Récupérer les documents de stock dans une plage de dates
export const getStockDocWithinDateRange = async (startDate: string, endDate: string) => {
  const token = await getToken();
  const response = await fetch(`${url.api_gateway}/stocks/date-range?startDate=${startDate}&endDate=${endDate}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des documents de stock');
  }
  return response.json();
}
