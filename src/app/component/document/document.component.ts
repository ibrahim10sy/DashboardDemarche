import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from 'src/app/model/Document';
import { DocumentService } from 'src/app/service/document.service';
import { AjoutDocumentComponent } from '../ajout-document/ajout-document.component';
import Swal from 'sweetalert2';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  displayedColumns: string[] = ['id', 'nom','image','fichier', 'audio','bureau','guide','action'];  
  dataSource = new MatTableDataSource<Document>();
  docs: Document[] = [];
 
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


  constructor(private serviceDoc : DocumentService,private dialogRef: MatDialog,private snack : CoreService) {
    
   
    //this.dataSource = new MatTableDataSource(this.docs);
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.serviceDoc.getDocument().subscribe((doc: any) => {
      this.docs = doc;
      this.dataSource = new MatTableDataSource(this.docs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onDelete(id: number): void {
    this.serviceDoc.deleteDocument(id).subscribe({
      next: res => {
        // Si la suppression est effectuée avec succès
        if (res) {
          Swal.fire({
            title: "Voulez-vous supprimé",
            text: "Attention vous allez supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#202882",
            confirmButtonText: "Supprimé avec succèss!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        }
       // Mettre à jour la liste locale après la suppression
       this.docs = this.docs.filter(doc => doc.idDocument !== id);

       // Mettre à jour la source de données MatTable
       this.dataSource.data = this.docs;
      },
      error: err => {
        // Vérifier si la réponse d'erreur est liée à une suppression échouée
        if (err.status === 200) {
          // Cela peut se produire si la réponse contient un statut 200 pour la suppression réussie
          Swal.fire({
            title: "Voulez-vous supprimé",
            text: "Attention vous allez supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#202882",
            confirmButtonText: "Supprimé avec succèss!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
          // Mettre à jour la liste locale après la suppression
        this.docs = this.docs.filter(doc => doc.idDocument !== id);

        // Mettre à jour la source de données MatTable
        this.dataSource.data = this.docs;
        } else {
          this.snack.openSnackBar('Une erreur est survenue lors de la suppression.', err);
        }
      }
    });
  }
  // onDelete(id: number): void {
  //   this.docSerive.deleteDocument(id).subscribe({
  //     next: res => {
  //       // Si la suppression est effectuée avec succès
  //       if (res) {
  //         Swal.fire({
  //           title: "Supprimé avec succès",
  //           text: "Le document a été supprimé avec succès",
  //           icon: "success"
  //         });
  //       }
  //      // Mettre à jour la liste locale après la suppression
  //      this.docs = this.docs.filter(doc => doc.idDocument !== id);

  //      // Mettre à jour la source de données MatTable
  //      this.dataSource.data = this.docs;
  //     },
  //     error: err => {
  //       // Vérifier si la réponse d'erreur est liée à une suppression échouée
  //       if (err.status === 200) {
  //         // Cela peut se produire si la réponse contient un statut 200 pour la suppression réussie
  //         Swal.fire({
  //           title: "Supprimé avec succès",
  //           text: "Le document a été supprimé avec succès",
  //           icon: "success"
  //         });
  //         // Mettre à jour la liste locale après la suppression
  //       this.docs = this.docs.filter(doc => doc.idDocument !== id);

  //       // Mettre à jour la source de données MatTable
  //       this.dataSource.data = this.docs;
  //       } else {
  //         this.snack.openSnackBar('Une erreur est survenue lors de la suppression.', err);
  //       }
  //     }
  //   });
  // }

  openDialog(){
    const dialog = this.dialogRef.open(AjoutDocumentComponent,{
      width: '520px',
      height: '500px',
    });
    dialog.afterClosed().subscribe(result => {
      // Rafraîchir les données après la fermeture de la boîte de dialogue
      this.loadDocuments();
    });
    
  }

  editDocument(data:any){
    const dialog = this.dialogRef.open(AjoutDocumentComponent,{
      data
    });
    console.log("Data envoyé", data);
    dialog.afterClosed().subscribe(result => {
      // Rafraîchir les données après la fermeture de la boîte de dialogue
      this.loadDocuments();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
