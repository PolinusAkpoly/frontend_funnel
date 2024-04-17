import { User } from "./User";

export interface Domain {
    domainName: string; // Nom du domaine à ajouter
    description?: string; // Description facultative du domaine
    userId?: User | string; // Description facultative du domaine
    created_at?: Date | string; // Date de création du domaine
    updated_at?: Date | string; // Date de la dernière mise à jour du domaine
    // Ajoutez d'autres propriétés au besoin
  }