import { TunnelStepType } from "./TunnelStepType";

export interface TunnelStep {
    _id?: string; // Identifiant unique de l'étape du tunnel
    name: string; // Nom de l'étape du tunnel
    description: string; // Description de l'étape du tunnel
    type: TunnelStepType; // Description de l'étape du tunnel
    order: number; // Ordre de l'étape dans le tunnel
    tunnelId?: string;
    isActive: boolean; // Indique si l'étape est active
    created_at?: Date | string; // Date de création de l'étape du tunnel
    updated_at?: Date | string; // Date de la dernière mise à jour de l'étape du tunnel
}