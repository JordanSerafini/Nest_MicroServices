import { url } from "../url";

export const getStockDocByIDFull = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stock/stockdocdetailsjoin/${DocumentId}`);
  return response.json();
}

export const getStockDocByID = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stock/stockdocdetails/${DocumentId}`);
  return response.json();
}

export const getStockDocPaginated = async ( limit: number, offset: number, searchQuery="") => {
  const response = await fetch(`${url.api_gateway}/stock/paginated?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
  return response.json();
}

export const getStorehouse = async () => {
  const response = await fetch(`${url.api_gateway}/storehouse`);
  return response.json();
}

export const getStorehouseNameById = async (id: string) => {
  const response = await fetch(`${url.api_gateway}/stock/storehouse/${id}`);
  const data = await response.json();
  return data.Caption; }
  
export const getStockDocLine = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stock/stockdocline/${DocumentId}`);
  return response.json();
}

export const getStockDocWithinDateRange = async (startDate: string, endDate: string) => {
  const response = await fetch(`${url.api_gateway}/stock/${startDate}/${endDate}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des documents de stock');
  }
  return response.json();
}