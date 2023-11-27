import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/Document/';

  createDocument(document:Document,image:File,audio:File,fichier:File): Observable<any>{
    const formData = new FormData();
    formData.append('document',JSON.stringify(document));
    formData.append('image',image);
    formData.append('audio',audio);
    formData.append('fichier',fichier);
    return this.http.post<any>(this.baseUrl + 'create', formData);
  }

  updateDocument(document:Document,id:number,image:File,audio:File,fichier:File): Observable<any>{
    const formData = new FormData();
    formData.append('document',JSON.stringify(document));
    formData.append('image',image);
    formData.append('audio',audio);
    formData.append('fichier',fichier);
    return this.http.put<any>(this.baseUrl + 'update/'+ id, formData);
  }

  getDocument(): Observable<any> {
    return this.http.get(this.baseUrl + 'read');
  }

  getDocumentByIdGuide(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 'liste/'+id);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }

}
