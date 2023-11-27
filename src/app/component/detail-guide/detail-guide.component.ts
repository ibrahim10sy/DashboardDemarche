import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guide } from 'src/app/model/Guide';
import { DocumentService } from 'src/app/service/document.service';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Document } from 'src/app/model/Document';

@Component({
  selector: 'app-detail-guide',
  templateUrl: './detail-guide.component.html',
  styleUrls: ['./detail-guide.component.css']
})
export class DetailGuideComponent {

  // guides : Guide []=[];
  document : Document |any;
  guideRecup : any;
  constructor(private route: ActivatedRoute,private  documentSerivce : DocumentService, private dialogRef : MatDialog, private router:Router) {}

  ngOnInit(): void {
  this.guideRecup= history.state.guide
  console.log('Données du guide récupérées :', this.guideRecup);
  this.getDocument(this.guideRecup.idGuide);
  }

  getDocument(id:number){
    this.documentSerivce.getDocumentByIdGuide(id).subscribe(doc =>{
      this.document = doc;
      console.log("Doc recup",this.document);
    })
  }

  openDocument(document : Document){
    console.log("open doc detail", document);
    this.router.navigate(['/documentDetail'], { state: { document: document}});
  }
}
