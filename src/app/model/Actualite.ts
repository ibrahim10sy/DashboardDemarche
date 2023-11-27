import { Admin } from "./Admin";

export interface Actualite {
    idActualite: number;
    libelle:     string;
    image:       string;
    description: string;
    dateDebut:   Date;
    dateFin:     Date;
    admin:       Admin;
}