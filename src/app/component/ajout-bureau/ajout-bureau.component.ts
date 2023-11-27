import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guide } from 'src/app/model/Guide';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/core.service';
import { BureauService } from 'src/app/service/bureau.service';
import { Admin } from 'src/app/model/Admin';

@Component({
  selector: 'app-ajout-bureau',
  templateUrl: './ajout-bureau.component.html',
  styleUrls: ['./ajout-bureau.component.css']
})
export class AjoutBureauComponent implements OnInit {

  bureauForm!:FormGroup;
  adminRecup: Admin | undefined;

  constructor(private bureauService : BureauService,private formBuilder: FormBuilder,
    private authService: AuthService,private snack : CoreService,  @Inject(MAT_DIALOG_DATA) public data: any){
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup  ", this.adminRecup);
    this.bureauForm = formBuilder.group({
      nom: [this.data ? this.data.nom : "",Validators.required],
      ville:[this.data ? this.data.ville : "", Validators.required],
      adresse:[this.data ? this.data.adresse : "", Validators.required],
      latitude:[this.data ? this.data.latitude : "", Validators.required],
      longitude:[this.data ? this.data.longitude : "", Validators.required],
      admin: this.adminRecup
    });
  }
  ngOnInit() {
    // Récupérer les informations de l'administrateur lors du démarrage du composant
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans bureau onInit ", this.adminRecup);
  }
  onSubmit(){
    const successMessage = 'Bureau créé avec succès !';
    const successMessageM = 'Bureau modifier avec succès !';
    const errorMessage = 'Impossible de modifier';

    if(this.bureauForm.valid){
    if(this.data){
      const bureauUpdate = this.bureauForm.value;
      try {
        this.bureauService.updateBureau(this.data.idBureau, bureauUpdate).subscribe(response => {
        this.snack.openSnackBar(successMessageM);
        this.bureauForm.reset();
        });
      } catch (error) {
        this.snack.openSnackBar(errorMessage); 
      }
    }else{

    if(this.bureauForm.valid){
      console.log(this.bureauForm.value);
      const newBureau = this.bureauForm.value;
      console.log(newBureau);
      try {
        this.bureauService.createBureau(newBureau).subscribe(response => {
          console.log(response);
          this.snack.openSnackBar(successMessage);
          this.bureauForm.reset();
        })
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  }
  }

}
