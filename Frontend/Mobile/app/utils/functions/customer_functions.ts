import { Customer } from "../../@types/customer.type";
import { url } from "../url";
import { postLogs } from "./logs_function";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fonction pour récupérer le token
const getToken = async () => {
  return await AsyncStorage.getItem("userToken");
};

// Fonction pour récupérer les items
export const getItem = async () => {
  try {
    const response = await fetch(`${url.api_gateway}/items`);
    if (!response.ok) {
      const error = new Error("Network response was not ok");
      await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Fonction pour récupérer tous les clients
export const getAllCustomers = async () => {
  try {
    const response = await fetch(`${url.api_gateway}/customers`);
    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error fetching all customers:', error);
    throw error;
  }
};

// Fonction pour récupérer un client par ID
export const getCustomerById = async (id: string) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error fetching customer by ID:', error);
    throw error;
  }
};

// Fonction pour récupérer un client par nom
export const getCustomerByName = async (name: string) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error fetching customer by name:', error);
    throw error;
  }
};

// Fonction pour récupérer les clients paginés
export const getCustomersPaginated = async (searchQuery: string, limit: number, offset: number) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error fetching paginated customers:', error);
    throw error;
  }
};

// Fonction pour créer un nouveau client
export const createCustomer = async (customer: any): Promise<any> => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      const error = new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      await postLogs({
        level: 'error',
        message: `Failed to add customer: ${response.status} ${response.statusText}`,
        statusCode: response.status,
        statusText: response.statusText,
      });
      throw error;
    }

    const responseText = await response.text();
    console.log('Response Text:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonParseError: any) {
      console.error('Error parsing JSON:', jsonParseError);
      await postLogs({
        level: 'error',
        message: `JSON Parse error: ${jsonParseError.message}`,
        responseText: responseText,
      });
      throw new Error(`JSON Parse error: ${jsonParseError.message}`);
    }

    return data;

  } catch (error: any) {
    console.error('Error adding customer:', error);
    await postLogs({
      level: 'error',
      message: `Unhandled exception in createCustomer: ${error.message}`,
      error: error,
    });
    throw error;
  }
};

// Fonction pour mettre à jour un client par ID
export const updateCustomerById = async (id: number, customer: Customer) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error updating customer by ID:', error);
    throw error;
  }
};

// Fonction pour supprimer un client par ID
export const deleteCustomerById = async (id: number) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error deleting customer by ID:', error);
    throw error;
  }
};

// Fonction pour récupérer un cluster de clients
export const getCustomersCluster = async (
  latCentral: number,
  lonCentral: number,
  rayonM: number
) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      await postLogs(error);
      throw error;
    }

    const response = await fetch(
      `${url.api_gateway}/customers/map?lat=${latCentral}&lon=${lonCentral}&rayon=${rayonM}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = new Error('Network response was not ok');
      await postLogs(error);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    await postLogs(error);
    console.error('Error fetching customers cluster:', error);
    throw error;
  }
};

