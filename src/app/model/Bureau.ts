import { Admin } from "./Admin";

export interface Bureau {
    idBureau:  number;
    nom:       string;
    ville:     string;
    adresse:   string;
    latitude:  string;
    longitude: string;
    admin:     Admin;
}