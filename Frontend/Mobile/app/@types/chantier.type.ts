// Interface for the Chantier table
export interface Chantier {
    id?: number;
    name: string;
    description?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    phone?: string;
    email?: string;
    contact?: string;
    start_date?: Date;
    end_date?: Date;
    client_id?: number;
    calendar_id?: number;
    fiche_chantier_id?: number;
  }

  // Interface for the FicheChantier table
  export interface FicheChantier {
    id: number;
    name: string;
    description?: string;
    project_supervision?: string;
    project_manager_id?: number;
    chantier_id?: number;
    imageUrl?: string | null;
    audioUrl?: string | null;
  }

// Interface for the Staff table
export interface Staff {
    id: number;
    name: string;
    grade?: string;
    role?: string;
    phone?: string;
    email: string;
  }