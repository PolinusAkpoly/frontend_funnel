export interface Formule{
    _id?: string; 
    name: string; 
    options?: Array<any>;
    postion: number;
    button_link: string;
    button_text: string;
    created_at?: Date | string;
    updated_at?: Date | string;
}