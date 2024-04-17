import { TunnelStep } from "./TunnelStep";

export interface Tunnel {
    _id?: string; // Identifiant unique du tunnel de vente
    name: string; // Nom du tunnel de vente
    slug?: string;
    description?: string; // Description du tunnel de vente
    domaine: string;
    type: string; // Description du tunnel de vente
    isActive: boolean; // Description du tunnel de vente
    steps?: TunnelStep[]; // Étapes du tunnel de vente
    userId?: string;
    created_at?: Date | string; // Date de création du tunnel de vente
    updated_at?: Date | string; // Date de la dernière mise à jour du tunnel de vente
  }