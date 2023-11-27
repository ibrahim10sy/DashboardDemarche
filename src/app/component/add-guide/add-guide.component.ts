import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/model/Admin';
import { Guide } from 'src/app/model/Guide';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/core.service';
import { GuideService } from 'src/app/service/guide.service';

@Component({
  selector: 'app-add-guide',
  templateUrl: './add-guide.component.html',
  styleUrls: ['./add-guide.component.css']
})
export class AddGuideComponent {

  guideFrom!: FormGroup;
  imageSrc: string | any;
  adminRecup: Admin | undefined;
  dataGuide : any;
  image!: File;
  audio!: File;
  dataTest! : any;

  constructor(private formBuilder: FormBuilder, private guideService: GuideService, private authService: AuthService, private snack : CoreService,
     @Inject(MAT_DIALOG_DATA) public data: any) {

    
    this.guideFrom = this.formBuilder.group({
      image: ['', Validators.required],
      audio: ['', Validators.required],
      libelle: [this.data ? this.data.libelle : "", Validators.required],
      description: [this.data ? this.data.description : "", Validators.required],
      admin: this.adminRecup
    });
  }

  ngOnInit() {
    // Récupérer les informations de l'administrateur lors du démarrage du composant
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans guide add onInit ", this.adminRecup);
    console.log('data',this.data);
  }

  ImageChange(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  AudioChange(event: any) {
    this.audio = event.target.files[0];
    console.log(this.audio);
  }

  onSubmit() {
    const errorMessage = 'Veuillez sélectionner à la fois une image et un fichier audio.';
    const successMessage = 'Guide créé avec succès !';
    const successMessageM = 'Guide modifier avec succès !';

    if (this.guideFrom.valid &&  this.image && this.audio) {
        if(this.data){
          const guideUpdate = this.guideFrom.value;
            try {
              this.guideService.updateGuide(guideUpdate,this.data.idGuide,this.image, this.audio).subscribe(response =>{
              this.snack.openSnackBar(successMessageM);
              console.log("guide modifier",this.guideFrom.value);
              })
            } catch (error) {
              this.snack.openSnackBar(errorMessage); 
            }
        } else {
            const newGuide = this.guideFrom.value;
            console.log(newGuide);
            try {
                this.guideService.createGuide(newGuide, this.image, this.audio).subscribe(response => {
                    console.log(response); 
                    this.snack.openSnackBar(successMessage);
                });
                this.guideFrom.reset();
            } catch (error) {
                this.snack.openSnackBar(errorMessage);        
            }
        }
        } 
      
      //   else {
      //     console.error(errorMessage);
      // }
}




  //prévisualisation de l'image
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.guideFrom.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

}
