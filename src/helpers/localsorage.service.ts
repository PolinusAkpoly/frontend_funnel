import { CarouselImage } from "../models/Carousel";

    // Méthode pour enregistrer une valeur dans localStorage
    export const  setItem = (key: string, value: any): void =>{
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde dans localStorage:', error);
        }
    }

    // Méthode pour récupérer une valeur depuis localStorage
    export const  getItem = <T>(key: string): T | null =>{
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error('Erreur lors de la récupération depuis localStorage:', error);
            return null;
        }
    }

    // Méthode pour supprimer une valeur de localStorage
    export const  removeItem = (key: string): void =>{
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Erreur lors de la suppression depuis localStorage:', error);
        }
    }

   
    
    export const removeItemByIdFromLocalStorage = (idToRemove: string): void => {
        // Récupérer les données actuelles du local storage
        const currentData: CarouselImage[] = JSON.parse(localStorage.getItem('carouselsData') || '[]');
    
        // Recherche de l'élément à supprimer
        const updatedData: CarouselImage[] = currentData.filter(item => item._id !== idToRemove);
    
        // Mettre à jour les données du local storage
        localStorage.setItem('carouselsData', JSON.stringify(updatedData));
    };
    
   export const updateItemByIdInLocalStorage = (idToUpdate: string, updatedData: CarouselImage): void => {
        // Récupérer les données actuelles du local storage
        const currentData: CarouselImage[] = JSON.parse(localStorage.getItem('carouselsData') || '[]');
    
        // Recherche de l'index de l'élément à modifier
        const indexToUpdate: number = currentData.findIndex(item => item._id === idToUpdate);
    
        // Si l'élément existe dans le tableau
        if (indexToUpdate !== -1) {
            // Mettre à jour l'élément dans le tableau
            currentData[indexToUpdate] = { ...currentData[indexToUpdate], ...updatedData };
    
            // Mettre à jour les données du local storage
            localStorage.setItem('carouselsData', JSON.stringify(currentData));
        } else {
            console.error(`L'élément avec l'ID ${idToUpdate} n'a pas été trouvé.`);
        }
    };
    
