import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/Admin';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  adminRecup! : Admin;
  image! : File;
  admin : Admin | undefined;
  modificationForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService,private snack : CoreService,private route: ActivatedRoute, private adminService : AdminService) {
    this.modificationForm
    = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
    this.admin = this.adminRecup;
  }
  ImageChange(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }
  ngOnInit(): void {
    this.adminRecup= history.state.admin
    console.log('Données du admin récupérées :', this.adminRecup);
   
    }

    logout() {
      this.authService.logout();
      // Redirect to the login page or home page after logout
      this.router.navigate(['/login']);
    }
    modifierProfil(){
      if(this.admin){
        console.log("admin a modifier",this.admin);
        try {
          this.adminService.updateProfil(this.admin, this.admin.idAdmin,this.image).subscribe(res =>{
            console.log(res);
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
}
