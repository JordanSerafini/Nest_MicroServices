import url
 from "./url";

export const checkItems = async () => {
    try {
        const response = await fetch(`${url}/item-counts`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chantiers:', error);
        throw error;
    }
    }

export const checkCustomers = async () => {
    try {
        const response = await fetch(`${url}/customer-counts`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chantiers:', error);
        throw error;
    }
    }

export const syncItems = async () => {
    try {
        const response = await fetch(`${url}/itemEBP-sync`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chantiers:', error);
        throw error;
    }
    }

export const syncCustomers = async () => {
    try {
        const response = await fetch(`${url}/customerEBP-sync`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chantiers:', error);
        throw error;
    }
    }

    export const syncAll = async () => {
        let itemResponse, customerResponse;
    
        try {
            itemResponse = await syncItems();
        } catch (error) {
            console.error('Error synchronizing items', error);
            throw error;
        }
    
        try {
            customerResponse = await syncCustomers();
        } catch (error) {
            console.error('Error synchronizing customers', error);
            throw error;
        }
    
        return {
            itemResponse,
            customerResponse,
        };
    };

    export const checkAll = async () => {
        let itemResponse, customerResponse;
    
        try {
            itemResponse = await checkItems();
        } catch (error) {
            console.error('Error checking items', error);
            throw error;
        }
    
        try {
            customerResponse = await checkCustomers();
        } catch (error) {
            console.error('Error checking customers', error);
            throw error;
        }
    
        return {
            itemResponse,
            customerResponse,
        };
    };
    
    