import { url } from "../url";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${url.api_gateway}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return await response.json();
};