import { Admin } from "./Admin";
import { Forum } from "./Forum";
import { Utilisateur } from "./Utilisateur";

export interface Reponse {
    idReponse?:   number;
    reponse?:     string;
    forum?:       Forum;
    utilisateur?: Utilisateur;
    admin?:       Admin;
}