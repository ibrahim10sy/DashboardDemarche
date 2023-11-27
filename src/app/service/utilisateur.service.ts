import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http : HttpClient) { }

  private baseUrl = 'http://localhost:8080/utilisateur/';

  getUser():Observable<any>{
    return this.http.get(this.baseUrl+'read');
    console.log(this.baseUrl);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+'delete/'+id)
  }
}
