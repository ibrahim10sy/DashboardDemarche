import { Admin } from "./Admin";
import { Utilisateur } from "./Utilisateur";

export interface Forum {
    idForum?:     number;
    libelle?:     string;
    description?: string;
    utilisateur?: Utilisateur;
    admin?:       Admin ;
}