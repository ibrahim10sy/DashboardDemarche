import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'src/app/model/Admin';
import { ActualiteService } from 'src/app/service/actualite.service';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-ajout-actu',
  templateUrl: './ajout-actu.component.html',
  styleUrls: ['./ajout-actu.component.css']
})
export class AjoutActuComponent {
  imageSrc: string | any;
  image!: File;
  adminRecup: Admin | undefined;

  actuForm!: FormGroup;

  
  constructor(private formBuilder: FormBuilder, private actuService:ActualiteService ,private authService: AuthService 
    ,private snack : CoreService, @Inject(MAT_DIALOG_DATA) public data: any){
   
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans guide ", this.adminRecup);

    this.actuForm = this.formBuilder.group({
      image: ['', Validators.required],
      dateDebut: [this.data ? this.data.dateDebut: "", Validators.required],
      dateFin: [this.data ? this.data.dateFin: "", Validators.required],
      libelle: [this.data ? this.data.libelle : "", Validators.required],
      description: [this.data ? this.data.description : "", Validators.required],
      admin: this.adminRecup
    });
  }
  
  ngOnInit() {
    // Récupérer les informations de l'administrateur lors du démarrage du composant
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans actualite onInit ", this.adminRecup);
  }
  ImageChange(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  onSubmit(){
    const errorMessage = 'Une erreur s\'est produit lors de l\'ajout';
    const successMessage = 'Actualité créé avec succès !';
    const successMessageM = 'Actualité modifier avec succès !';
    const Message = 'Veillez remplir les champs';

    if(this.actuForm.valid && this.image){
      if(this.data){
        const updateActu = this.actuForm.value;
        try {
          this.actuService.updateActualite(updateActu,this.image,this.data.idActualite).subscribe((response) => {
            this.snack.openSnackBar(successMessageM);
            console.log("Actu modifier",this.actuForm.value);
          })
        } catch (error) {
          this.snack.openSnackBar(errorMessage)
        }
      } else{
        const newActu = this.actuForm.value;
        console.log(newActu);
        try {
          this.actuService.createActualite(newActu,this.image).subscribe(response => {
            console.log(response);
            this.snack.openSnackBar(successMessage);
          })
          this.actuForm.reset();
        } catch (error) {
          this.snack.openSnackBar(Message); 
        }
      }
    }else{
      this.snack.openSnackBar(Message);  
    }
  }


  
  //prévisualisation de l'image
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.actuForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
}
