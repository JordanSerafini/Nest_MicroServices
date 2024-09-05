import { Customer } from "../../@types/customer.type";
import { url } from "../url";
import { postLogs } from "./logs_function";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllCustomers = async () => {
    try {
        const response = await fetch(`${url.api_gateway}/clients`);
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

export const getCustomerById = async (id: number) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`);
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

export const getCustomerByName = async (name: string) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${name}`);
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

export const getCustomersPaginated = async (searchQuery: string, limit: number, offset: number) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
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

export const createCustomer = async (customer: any): Promise<any> => {
    try {
        const response = await fetch(`${url.api_gateway}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        // Check if the HTTP response status code is successful
        if (!response.ok) {
            const error = new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            // Log error to server before throwing to handle it further up the call stack
            await postLogs({
                level: 'error',
                message: `Failed to add customer: ${response.status} ${response.statusText}`,
                statusCode: response.status,
                statusText: response.statusText,
            });
            throw error;
        }

        // Check and log the response text before parsing
        const responseText = await response.text();
        console.log('Response Text:', responseText);

        // Attempt to parse the response text as JSON
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
        // Log the error locally and also send it to server-side logging
        console.error('Error adding customer:', error);
        await postLogs({
            level: 'error',
            message: `Unhandled exception in createCustomer: ${error.message}`,
            error: error,
        });
        throw error;
    }
};


export const updateCustomerById = async (id: number, customer: Customer) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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

export const deleteCustomerById = async (id: number) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`, {
            method: 'DELETE',
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

export const getCustomersCluster = async (latCentral: number, lonCentral: number, rayonM: number) => {
    try {
        const response = await fetch(
            `${url.api_gateway}/clients/cluster?latCentral=${latCentral}&lonCentral=${lonCentral}&rayonM=${rayonM}`
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