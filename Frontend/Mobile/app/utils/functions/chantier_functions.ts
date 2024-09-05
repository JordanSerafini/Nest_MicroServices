import { Chantier } from "../../@types/chantier.type";
import { url } from "../url";

export const getChantiers = async () => {
    try {
        const response = await fetch(`${url.chantier}/chantiers`);
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

export const addChantier = async (chantier: Chantier) => {
    try {
        const response = await fetch(`${url.chantier}/chantier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chantier),
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding chantier:', error);
        throw error;
    }
}

export const getStaff = async () => {
    try {
        const response = await fetch(`${url.staff}/staff`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching staff:', error);
        throw error;
    }
}