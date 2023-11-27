import { Admin } from "./Admin";

export interface Guide {
    idGuide:     number;
    image:       string;
    audio:       string;
    libelle:     string;
    description: string;
    admin:       Admin;
}