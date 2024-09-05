import url from "../url";

//* EBP MSSQL
export async function getEBPStockDoc(limit = 25, offset = 0, searchQuery = "", doctype = "") {
    try {
        const url2 = `${url.main}/StockDocLines?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}&documentType=${doctype}`;
        const response = await fetch(url2);
        const data = await response.json();
        console.log(data); 
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Rejette l'erreur pour que l'appelant puisse la gérer
    }
  }
  
  export async function getEBPitems(limit = 25, offset = 0, searchQuery = "") {
    try {
        const url2 = `${url.local}/ItemsPaginatedEBP?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}`;
        const response = await fetch(url2);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Rejette l'erreur pour que l'appelant puisse la gérer
    }
  }
  
  export async function getEBPcustomer(limit = 25, offset = 0, searchQuery = "") {
    try {
        const url2 = `${url.local}/CustomersPaginatedEBP?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}`;
        const response = await fetch(url2);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Rejette l'erreur pour que l'appelant puisse la gérer
    }
  }
  
  export async function StockDoc(limit = 25, offset = 0, searchQuery = ""){
    try {
      const url2 = `${url.main}/StockDocLines?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}`;
      const response = await fetch(url2);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error; // Rejette l'erreur pour que l'appelant puisse la gérer
    }
  }
  
  export async function StockDocByID(id: string){
    try {
      const url2 = `${url.main}/StockDocLinesByID/${id}`;
      const response = await fetch(url2);
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error; // Rejette l'erreur pour que l'appelant puisse la gérer
    }
  }
  
  
  