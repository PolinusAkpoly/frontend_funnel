import { User } from "./User";

export interface Tag {
    name: string; // Le nom du tag
    description?: string; // Une description facultative du tag
    userId: User |string; // Une description facultative du tag
    // Ajoutez d'autres propriétés au besoin
    created_at?: Date | string; // Date de création de l'étape du tunnel
    updated_at?: Date | string; //
  }
  