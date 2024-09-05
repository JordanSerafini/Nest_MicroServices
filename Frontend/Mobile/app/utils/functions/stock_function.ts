import { url } from "../url";

// Récupérer un document de stock avec ses détails et les lignes associées
export const getStockDocByIDFull = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stocks/details/${DocumentId}`);
  return response.json();
}

// Récupérer un document de stock par son ID
export const getStockDocByID = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stocks/document/${DocumentId}`);
  return response.json();
}

// Récupérer les documents de stock paginés
export const getStockDocPaginated = async (limit: number, offset: number, searchQuery = "") => {
  const response = await fetch(`${url.api_gateway}/stocks/paginate?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
  return response.json();
}

// Récupérer tous les entrepôts
export const getStorehouse = async () => {
  const response = await fetch(`${url.api_gateway}/stocks/storehouses`);
  return response.json();
}

// Récupérer le nom d'un entrepôt par son ID
export const getStorehouseNameById = async (id: string) => {
  const response = await fetch(`${url.api_gateway}/stocks/storehouse/${id}`);
  const data = await response.json();
  return data.Caption;
}

// Récupérer les lignes d'un document de stock par DocumentId
export const getStockDocLine = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stocks/document-lines/${DocumentId}`);
  return response.json();
}

// Récupérer les documents de stock dans une plage de dates
export const getStockDocWithinDateRange = async (startDate: string, endDate: string) => {
  const response = await fetch(`${url.api_gateway}/stocks/date-range?startDate=${startDate}&endDate=${endDate}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des documents de stock');
  }
  return response.json();
}
