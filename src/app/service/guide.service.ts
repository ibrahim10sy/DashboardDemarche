// guide.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guide } from '../model/Guide';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private baseUrl = 'http://localhost:8080/Guide/';

  constructor(private http: HttpClient) { }
  
  createGuide(guide:Guide, image: File, audio: File){
    const formData = new FormData();
    formData.append('guide', JSON.stringify(guide));
    formData.append('image', image);
    formData.append('audio', audio);
    return this.http.post<any>(this.baseUrl +'create', formData);
  } 
  getGuide(): Observable<any> {
    return this.http.get(this.baseUrl + 'read');
  }

  getGuideById(id:number):Observable<any>{
    return this.http.get(this.baseUrl +'read/'+id);
  }

  deleteGuide(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

  updateGuide(guide:Guide, id: number, image: File, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('guide', JSON.stringify(guide));
    formData.append('image', image);
    formData.append('audio', audio);
    return this.http.put<any>(this.baseUrl+'update/' + id, formData)
  }
}
