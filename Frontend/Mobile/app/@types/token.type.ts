export interface DecodedToken {
    id: string;
    email: string;
    role: string;
    nom: string;
    prenom: string;
    isShadow: boolean;
    utilisateur_id: string;
    position: string;
    telephone: string;
    exp: number;
    iat: number; 
  }