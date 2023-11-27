import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  


  constructor(private http : HttpClient) { }

  private baseUrl = 'http://localhost:8080/admin/connexion';
  private baseUrl2 = 'http://localhost:8080/admin/';

  
  postConnexion(email: string, motDePasse: string): Observable<any> {
    const body = {
      email: email,
      motDePasse: motDePasse
    };
    return this.http.post(this.baseUrl, body, { headers: { 'Content-Type': 'application/json' } });
  }
  
  updateProfil(admin:Admin, id: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('guide', JSON.stringify(admin));
    formData.append('image', image);
    return this.http.put<any>(this.baseUrl2+'update/' + id, formData)
  }
}
