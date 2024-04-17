export interface Profile {
    _id?: string;
    userId: string; // Identifiant de l'utilisateur lié au profil
    bio: string; // Biographie de l'utilisateur
    profileImage: string; // URL de l'image de profil
    followers: number; // Nombre d'abonnés
    following: number; // Nombre d'utilisateurs suivis
    website?: string; // Site web de l'utilisateur (optionnel)
    birthdate?: Date | string; // Date de naissance de l'utilisateur (optionnel)
    location?: string; // Localisation de l'utilisateur (optionnel)
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      // Ajoutez d'autres réseaux sociaux au besoin
    };
    created_at: Date | string;
    updated_at: Date | string;
  }
  