import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'src/app/model/Admin';
import { Bureau } from 'src/app/model/Bureau';
import { Guide } from 'src/app/model/Guide';
import { AuthService } from 'src/app/service/auth.service';
import { BureauService } from 'src/app/service/bureau.service';
import { CoreService } from 'src/app/service/core.service';
import { DocumentService } from 'src/app/service/document.service';
import { GuideService } from 'src/app/service/guide.service';

@Component({
  selector: 'app-ajout-document',
  templateUrl: './ajout-document.component.html',
  styleUrls: ['./ajout-document.component.css']
})
export class AjoutDocumentComponent implements OnInit {
  
  imageSrc: string | any;
  image!: File;
  audio!: File;
  fichier!: File;
  docForm!: FormGroup;
  guideSelected:  Guide |any;
  bureauSelected: Bureau | any;
  adminRecup: Admin | undefined;


  constructor(private docSerivce : DocumentService, private formBuilder: FormBuilder,private guideSer: GuideService, private bureauSer : BureauService,
    private authService: AuthService, private snack : CoreService,  @Inject(MAT_DIALOG_DATA) public data: any){
      
      this.adminRecup = this.authService.getAdminConnecte();
      console.log("Admin recup dans doc onInit ", this.adminRecup);

      this.docForm = this.formBuilder.group({
        image: ['', Validators.required],
        audio: ['', Validators.required],
        fichier: ['', Validators.required],
        nom: [this.data ? this.data.nom : "", Validators.required],
        description: [this.data ? this.data.description : "", Validators.required],
        bureau: [this.data ? this.data.bureau.nom : "", Validators.required],
        guide: [this.data ? this.data.guide.libelle : "", Validators.required],
        admin: this.adminRecup
      });
      
  }

  ngOnInit() {
    // Récupérer les informations de l'administrateur lors du démarrage du composant
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans doc onInit ", this.adminRecup);

    this.guideSer.getGuide().subscribe(res => {
      this.guideSelected = res;
      console.log("guide",this.guideSelected);
     })
  
      this.bureauSer.getBureau().subscribe(res => {
        this.bureauSelected = res;
        console.log("bureau",this.bureauSelected);
      });
  }
  onSubmit(){
    const errorMessage = 'Veuillez sélectionner à la fois une image et un fichier audio.';
    const successMessage = 'Document créé avec succès !';
    const successMessageM = 'Document modifier avec succès !';

    if (this.docForm.valid &&  this.image && this.audio){
      if(this.data){
        const documentUpdate = this.docForm.value;
        try {
          this.docSerivce.updateDocument(documentUpdate,this.data.idDocument,this.image,this.audio,this.fichier).subscribe(res => {
            this.snack.openSnackBar(successMessageM);
            console.log("Document modifier",this.docForm.value);
          })
         
        } catch (error) {
          this.snack.openSnackBar(errorMessage); 
        }
      } else{
        const newDocument = this.docForm.value;
        console.log(newDocument);
        try {
          this.docSerivce.createDocument(newDocument,this.image,this.audio,this.fichier).subscribe(res => {
            console.log(res); 
            this.snack.openSnackBar(successMessage);
          });
          this.docForm.reset();
        } catch (error) {
          this.snack.openSnackBar(errorMessage); 
        }
      }
    }
  }

  ImageChange(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  AudioChange(event: any) {
    this.audio = event.target.files[0];
    console.log(this.audio);
  }

  onFileSelected(event: any): void {
    this.image = event.target.files[0];
    console.log(this.fichier);
  }
   //prévisualisation de l'image
   onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.docForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }


}
