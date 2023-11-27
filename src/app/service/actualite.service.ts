import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actualite } from '../model/Actualite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  private baseUrl = 'http://localhost:8080/Actualite/';

  constructor( private http : HttpClient) { }

  createActualite(actualite: Actualite, image:File): Observable<any>{
    const formData = new FormData();
    formData.append('actualite', JSON.stringify(actualite));
    formData.append('image', image);
    return this.http.post<any>(this.baseUrl +'create', formData);
  }

  updateActualite(actualite: Actualite, image:File, id : number): Observable<any> {
    const formData = new FormData();
    formData.append('actualite', JSON.stringify(actualite));
    formData.append('image', image);
    return this.http.put<any>(this.baseUrl +'update/' + id, formData);
  }


  getActualite(): Observable<any> {
    return this.http.get(this.baseUrl + 'read');
  }

  deleteActualite(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
}
