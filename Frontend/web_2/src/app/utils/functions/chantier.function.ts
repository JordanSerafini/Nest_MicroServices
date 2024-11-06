import { ConstructionSite } from "@/@types/chantier.type";
import { url } from "../url";
import Cookies from 'js-cookie';

// Fonction pour récupérer le token
const getToken = () => {
  return Cookies.get("userToken");
};

// Fonction pour récupérer tous les chantiers
export const getAllchantiers = async () => {
  try {
    const response = await fetch(`${url.api_gateway}/chantiers`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching all chantiers:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Fonction pour récupérer un chantier par ID
export const getChantierById = async (id: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/chantiers/${id}`, {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching project by ID:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Fonction pour créer un nouveau chantier
export const createProject = async (project: ConstructionSite): Promise<ConstructionSite> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
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
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding project:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Fonction pour mettre à jour un chantier par ID
export const updateProjectById = async (id: number, project: ConstructionSite) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
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
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating project by ID:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Fonction pour supprimer un chantier par ID
export const deleteProjectById = async (id: number) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/chantiers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting project by ID:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Fonction pour récupérer les clients paginés
export const getChantiersPaginated = async (searchQuery: string, limit: number, offset: number) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/chantiers/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching paginated customers:', error.message);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};
