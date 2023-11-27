import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/Admin';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router, private authService : AuthService,private snack : CoreService,) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // // Au moment de l'initialisation du composant, essayez de charger les données de l'administrateur depuis le localStorage
    // const storedAdminId = localStorage.getItem('idAdmin');
    // if (storedAdminId) {
    //   console.log("storedAdminId: " + storedAdminId);
    // }
  }
  
  onSubmit() { 
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      console.log(login);
      this.loading = true;
      this.adminService.postConnexion(login.email, login.motDePasse).subscribe(
        (response: Admin) => {
          const AdminCon = response; 
          console.log("ID de l'admin est :", AdminCon);
          this.authService.setAdminConnecte(AdminCon); 
          console.log("Mise à jour confirmée", AdminCon.idAdmin)
          console.log("connexion établie", AdminCon);
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        },
        (error: any) => {
          this.snack.openSnackBar("Mot de passe ou nom incorrect");
          console.log("erreur", error);
        }
      );
    }
  }
  
  
  }

