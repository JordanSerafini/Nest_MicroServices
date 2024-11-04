import { url } from "../url";
import Cookies from 'js-cookie';

const getToken = () => {
  return Cookies.get("token");
};

export const getSalePaginated = async (searchQuery: string, limit: number, offset: number) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/sale/paginate?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
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
  } catch (error) {
    console.error('Error fetching paginated sales:', error);
    throw error;
  }
};

export const getSalePaginated_Date = async (searchQuery: string, limit: number, offset: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await fetch(`${url.api_gateway}/sale/paginate_date?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`, {
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
    } catch (error) {
      console.error('Error fetching paginated sales:', error);
      throw error;
    }
  };

export const getSaleById = async (DocumentId: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/sale/${DocumentId}`, {
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
  } catch (error) {
    console.error('Error fetching sale by Id:', error);
    throw error;
  }
};

export const getLineByDocumentId = async (DocumentId: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/sale/${DocumentId}/lines`, {
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
  } catch (error) {
    console.error('Error fetching line by DocumentId:', error);
    throw error;
  }
};

export const getSaleByCategory = async (category: string, limit: number, offset: number) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${url.api_gateway}/sale/paginate/${category}?limit=${limit}&offset=${offset}`, {
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
  } catch (error) {
    console.error('Error fetching sales by category:', error);
    throw error;
  }
};

export async function fetchMonthlyIncome(month: number, year: number) {
  try {
    // Récupérer le token JWT depuis les cookies
    const token = Cookies.get('token');
    if (!token) throw new Error("Token not found");

    const response = await fetch(`${url.api_gateway}/sale/monthly_income?month=${month}&year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch monthly income");
    }

    // Récupérer et retourner les données JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    throw error;
  }
}

