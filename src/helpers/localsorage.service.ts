
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


