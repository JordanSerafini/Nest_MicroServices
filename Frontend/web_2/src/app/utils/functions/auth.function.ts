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

export const logout = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("Aucun utilisateur trouvé dans le localStorage");
      return { error: "Utilisateur non trouvé" };
    }
  
    const user = JSON.parse(storedUser);
  
    const logoutDto = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  
    try {
      const response = await fetch(`${url.api_gateway}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logoutDto),
      });
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      return { error: "Erreur de déconnexion" };
    }
  };
  