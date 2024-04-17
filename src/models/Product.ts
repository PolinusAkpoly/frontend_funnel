import { Category } from "./Category";
import { ProductType } from "./ProductType";
import { User } from "./User";

export interface Product {
    _id: string; // Identifiant unique du tunnel de vente
    name: string; // Nom du tunnel de vente
    slug: string;
    description: string; // Description du tunnel de vente
    content: string; // Description du tunnel de vente
    type: ProductType;
    author: User | string;
    categories: Category[]
    created_at?: Date | string;
    updated_at?: Date | string;
}