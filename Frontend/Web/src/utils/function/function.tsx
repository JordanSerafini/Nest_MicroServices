import axios, { AxiosResponse } from "axios";
import url from "../url";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../../types/item";
import { Customer } from "../../types/customer";
import { setItems } from "../../store/features/itemSlice";
import { AppDispatch } from "../../store";
import Homecards from "../../types/homecard";
import { setCustomers } from "../../store/features/customerSlice";
import { setSupplier } from "../../store/features/supplierSlice";

export type FetchDataContextParams = {
  setItems?: Dispatch<SetStateAction<Item[]>>;
  setCustomerList?: Dispatch<SetStateAction<Customer[]>>;
  setSupplierList?: Dispatch<SetStateAction<Customer[]>>;
};

export async function deleteCustomerById(id: number) {
  try {
    await axios.delete(`${url.main}/deleteCustomer/${id}`);
  } catch (error) {
    console.error("Error deleting client: ", error);
  }
}

export async function deleteCustomerByName(name: string): Promise<{ ok: boolean }> {
  try {
    await axios.delete(`${url.local}/deleteCustomerByName/${name}`);
    return { ok: true };
  } catch (error) {
    console.error("Error deleting client: ", error);
    return { ok: false };
  }
}

export async function fetchCustomer(
  setCustomerList: Dispatch<SetStateAction<Customer[]>>
) {
  try {
    const response = await axios.get(`${url.main}/getAllCustomer`);
    setCustomerList(response.data.rows);
  } catch (error) {
    console.error("Error fetching clients: ", error);
  }
}

export async function fetchStockDoc() {
  try {
    const response = await axios.get(`${url.main}/getAllStockDocs`);
    return response.data.rows;
  } catch (error) {
    console.error("Error fetching stock documents: ", error);
  }
}

export async function fetchStockDocDetails(id: string) {
  try {
    const response = await axios.get(`${url.main}/getStockDocDetails/${id}`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock documents details: ", error);
    return null; 
  }
}

export async function fetchDepot() {
  try {
    const response = await axios.get(`${url.main}/getAllDepot`);
    return response.data;
  } catch (error) {
    console.error("Error fetching depot: ", error);
    return null;
  }
}

export async function login(email: string, password: string) {

  try {
    const response = await axios.post(`${url.main}/login`, {
      email,
      password,
    });
    const { token, userData } = response.data;

    const userDataSort = {
      id: userData.id,
      email: userData.email,
      prenom: userData.prenom,
      nom: userData.nom,
      role: userData.role,
  };
    // Stocker le token dans le LocalStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userDataSort));
    return { token, logged: true};
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new Error("Adresse e-mail ou mot de passe incorrect.");
      } else {
        console.error("Erreur lors de la connexion : ", error);
        throw new Error("Une erreur est survenue lors de la connexion.");
      }
    }
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}

export async function fetchStockDocLinesWithPrice() {
  try {
    const response = await axios.get(`${url.main}/getDocLineWithPrice`);
    return response;
  } catch (error) {
    console.error("Error fetching stock documents lines: ", error);
    return null;
  }
}


export async function fetchCards(userID: number, setCards: (cards: Homecards[]) => void) {
  try {
      const response = await fetch(`${url.main}/getCards/${userID}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
      const data = await response.json();
      setCards(data);
  } catch (error) {
      console.error('Failed to fetch cards:', error);
  }
}

export async function fetchCustomersPaginated(dispatch: AppDispatch, limit: number, offset: number, searchQuery: string) {
  try {
    const response = await axios.post(`${url.main}/clients`, {
      limit,
      offset,
      searchQuery
    });
    dispatch(setCustomers({
      customers: response.data.customers,
      totalCustomers: response.data.totalCustomer, 
      totalPages: response.data.totalPages
    }));
  } catch (error) {
    console.error("Error fetching customers: ", error);
  }
}


export async function fetchItems(dispatch: AppDispatch, limit: number, offset: number, searchQuery: string) {
  try {
    const response = await axios.post(`${url.main}/items`,
      { limit, offset, searchQuery }
    );
    dispatch(setItems(response.data.items));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }
}

export async function fetchBEPaginated (limit: number, offset: number, searchQuery: string) {
  try {
    const response = await axios.post(`${url.main}/stockbe`, {
      limit,
      offset,
      searchQuery
    });
    //dispatch(setItems(response.data.items));
    //console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching BE: ", error);
  }
}

export async function fetchBSPaginated (dispatch: AppDispatch, limit: number, offset: number, searchQuery: string) {
  try {
    const response = await axios.post(`${url.main}/stockbs`, {
      limit,
      offset,
      searchQuery
    });
    dispatch(setItems(response.data.items));
  } catch (error) {
    console.error("Error fetching BS: ", error);
  }
}
export async function fetchSupplierPaginated(dispatch: AppDispatch, limit: number, offset: number, searchQuery: string) {
  try {
    const response = await axios.post(`${url.main}/supplier`, {
      limit,
      offset,
      searchQuery
    });
    dispatch(setSupplier({
      suppliers: response.data.suppliers,
      totalSuppliers: response.data.totalSuppliers, 
      totalPages: response.data.totalPages
    }));
  } catch (error) {
    console.error("Error fetching customers: ", error);
  }
}

export async function CheckUpdate() {
  try {
    const responseCustomer = await fetch("http://localhost:5000/findNewCustomersbyID");
    const { UniqueToPG, UniqueToSQL } = await responseCustomer.json();

    const responseItem = await fetch("http://localhost:5000/findNewItemsbyID");
    const { UniqueToPG: UniqueToPGItem, UniqueToSQL: UniqueToSQLItem } = await responseItem.json();

    return { UniqueToPG, UniqueToSQL, UniqueToPGItem, UniqueToSQLItem};
  } catch (error) {
    console.error("Error checking customer differences:", error);
  }
};

export async function searchItemFamilly(id: string) {
  try {
    const response = await axios.get(`${url.main}/getItemFamily`);
   
    const itemFamily = response.data.rows.find((row: { Id: string }) => row.Id === id);
    return itemFamily ? itemFamily.Caption : "Famille inconnue"; 
  } catch (error) {
    console.error("Error fetching item family: ", error);
    return "Famille inconnue";
  }
}

export interface Family {
  Id: string;
  name: string;
}

export async function fetchItemFamilly(): Promise<AxiosResponse<{ rows: Family[] }>> {
  try {
    return await axios.get<{ rows: Family[] }>(`${url.main}/getItemFamily`);
  } catch (error) {
    console.error("Error fetching item family: ", error);
    throw error; 
  }
}


export async function fetchEventTypes() {
  try {
    const response = await axios.get(`${url.main}/getEventTypes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event types: ", error);
    return null;
  }
}

export async function fetchEvents(limit: number , offset?: number, searchQuery?:string) {
  try {
    const response = await axios.get(`${url.main}/getEvents?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events: ", error);
    return null;
  }
}

export async function fetchDailyEvents(date: string) {
  try {
    const response = await axios.get(`${url.main}/dailyEvents`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily events: ", error);
    return null;
  }
}

export async function fetchWeeklyEvents(startDate: string, endDate: string) {
  try {
    const response = await axios.get(`${url.main}/weeklyEvents`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly events: ", error);
    return null;
  }
}

export async function fetchMonthlyEvents(month: number, year: number) {
  try {
    const response = await axios.get(`${url.main}/monthlyEvents`, {
      params: { month, year }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly events: ", error);
    return null;
  }
}

export async function fetchEventsInRange(startDate: string, endDate: string) {
  try {
    const response = await axios.get(`${url.main}/eventsInRange`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events in range: ", error);
    return null;
  }
}
