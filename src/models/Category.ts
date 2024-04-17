import { User } from "./User";

export interface Category {
    name: string; // Le nom du tag
    description?: string; // Une description facultative du tag
    userId: User |string; // Une description facultative du tag
    // Ajoutez d'autres propriétés au besoin
  }
  