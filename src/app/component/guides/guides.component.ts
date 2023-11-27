import { Component, OnInit, ViewChild } from '@angular/core';
import { Guide } from 'src/app/model/Guide';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GuideService } from 'src/app/service/guide.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGuideComponent } from '../add-guide/add-guide.component';
import Swal from 'sweetalert2';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css']
})
export class GuidesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'audio','image','action'];  
  dataSource = new MatTableDataSource<Guide>();
  guides: Guide[] = [];
 
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private guideService : GuideService, private dialog : MatDialog,private snack : CoreService){
     // this.dataSource = new MatTableDataSource(this.guides);
    }

    ngOnInit(): void {
      this.guideService.getGuide().subscribe(guide => {
        this.guides = guide;
        this.dataSource = new MatTableDataSource(this.guides);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog():void{
    const dialogRef = this.dialog.open(AddGuideComponent, {
      width: '520px',
      height: '400px',
    });
    dialogRef.afterClosed();
  }

  editGuit(data:any){
    const dialogRef = this.dialog.open(AddGuideComponent, {
      data
    });
    console.log("data a envoyé",data);
    dialogRef.afterClosed();
    this.guides = this.guides.filter(guide => guide.idGuide !== data.idGuide);

    // Mettre à jour la source de données MatTable
    this.dataSource.data = this.guides;
  }

  onDelete(id: number): void {
    this.guideService.deleteGuide(id).subscribe({
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
        this.guides = this.guides.filter(guide => guide.idGuide !== id);

        // Mettre à jour la source de données MatTable
        this.dataSource.data = this.guides;
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
          this.guides = this.guides.filter(guide => guide.idGuide !== id);

    // Mettre à jour la source de données MatTable
    this.dataSource.data = this.guides;
        } else {
          this.snack.openSnackBar('Une erreur est survenue lors de la suppression du guide.', err);
        }
      }
    });
  }
  
}
