import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bureau } from '../model/Bureau';

@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor(private http : HttpClient) { }

  private baseUrl = 'http://localhost:8080/Bureau/'

  createBureau(bureau : Bureau): Observable<any> {
    return  this.http.post<any>(this.baseUrl+'create', bureau); 
  }

  getBureau(): Observable<any> {
    return this.http.get(this.baseUrl+'read');
  }

  deleteBureau(id:number): Observable<any> {
    return this.http.delete(this.baseUrl+'delete/'+ id);
  }

  updateBureau(id:number,bureau:Bureau): Observable<any> {
    return this.http.put<any>(this.baseUrl+'update/'+id, bureau);
  }
}
