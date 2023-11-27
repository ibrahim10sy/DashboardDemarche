import { Admin } from "./Admin";
import { Bureau } from "./Bureau";
import { Guide } from "./Guide";

export interface Document {
    idDocument:  number;
    image:       string;
    audio:       string;
    fichier:     string;
    nom:         string;
    description: string;
    bureau :     Bureau;
    guide:       Guide;
    admin:       Admin;
}