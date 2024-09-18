import { url } from "../url";
//import { postLogs } from "./logs_function";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fonction pour récupérer le token
const getToken = async () => {
  return await AsyncStorage.getItem("userToken");
};

// Fonction pour récupérer tous les chantiers
export const getAllchantiers = async () => {
  try {
    const response = await fetch(`${url.api_gateway}/chantiers`);
    if (!response.ok) {
      const error = new Error('Network response was not ok');
      //await postLogs(error);
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    //await postLogs(error);
    console.error('Error fetching all chantiers:', error);
    throw error;
  }
};

// Fonction pour récupérer un chantier par ID
export const getChantierById = async (id: number) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      //await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/chantiers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = new Error('Network response was not ok');
      //await postLogs(error);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    //await postLogs(error);
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

// Fonction pour créer un nouveau chantier
export const createProject = async (project: any): Promise<any> => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
      //await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/chantiers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const error = new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    //   await postLogs({
    //     level: 'error',
    //     message: `Failed to add project: ${response.status} ${response.statusText}`,
    //     statusCode: response.status,
    //     statusText: response.statusText,
    //   });
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error adding project:', error);
    // await postLogs({
    //   level: 'error',
    //   message: `Unhandled exception in createProject: ${error.message}`,
    //   error: error,
    // });
    throw error;
  }
};

// Fonction pour mettre à jour un chantier par ID
export const updateProjectById = async (id: number, project: any) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
    //   await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/chantiers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const error = new Error('Network response was not ok');
    //   await postLogs(error);
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // await postLogs(error);
    console.error('Error updating project by ID:', error);
    throw error;
  }
};

// Fonction pour supprimer un chantier par ID
export const deleteProjectById = async (id: number) => {
  try {
    const token = await getToken();
    if (!token) {
      const error = new Error('Token not found');
    //   await postLogs(error);
      throw error;
    }

    const response = await fetch(`${url.api_gateway}/chantiers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok)
        throw new Error('Network response was not ok');
} catch (error: any) {
    // await postLogs(error);
    console.error('Error deleting project by ID:', error);
    throw error;
  }
}

// Fonction pour récupérer les clients paginés
export const getChantiersPaginated = async (searchQuery: string, limit: number, offset: number) => {
    try {
      const token = await getToken();
      if (!token) {
        const error = new Error('Token not found');
        // await postLogs(error);
        throw error;
      }
  
      const response = await fetch(`${url.api_gateway}/chantiers/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const error = new Error('Network response was not ok');
        // await postLogs(error);
        throw error;
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
    //   await postLogs(error);
      console.error('Error fetching paginated customers:', error);
      throw error;
    }
  };
