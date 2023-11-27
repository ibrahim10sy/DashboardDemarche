import { Injectable } from '@angular/core';
import { Admin } from '../model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private admin1: Admin | undefined;

  saveAdmin(){
    localStorage.setItem('admin1', JSON.stringify(this.admin1));
    }

  constructor() {
    
  }

  setAdminConnecte(admin: Admin) {
    this.admin1 = admin;
    this.saveAdmin();
  }

  getAdminConnecte() {
    let data: any = localStorage.getItem('admin1');
    this.admin1 = JSON.parse(data);
    console.log(this.admin1);
    return this.admin1;
}
  // setAdminConnecte(admin: Admin) {
  //   this.admin1 = admin;
  //   console.log("setAdminConnecte", this.admin1);

  //   // Stocker l'id de l'administrateur connecté dans le localStorage
  //   localStorage.setItem('idAdmin', this.admin1.idAdmin.toString());
  // }

  // getAdminConnecte(): Admin | undefined {
  //   return this.admin1;
  // }
}
