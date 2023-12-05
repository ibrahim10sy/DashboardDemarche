import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutActuComponent } from '../ajout-actu/ajout-actu.component';
import { Actualite } from 'src/app/model/Actualite';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActualiteService } from 'src/app/service/actualite.service';
import { CoreService } from 'src/app/service/core.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle','dateDebut','dateFin','image','action'];  
  dataSource = new MatTableDataSource<Actualite>();
  actualite : Actualite []=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialogRef: MatDialog, private actuService: ActualiteService,private snack : CoreService){
    this.dataSource = new MatTableDataSource(this.actualite);
  }
  ngOnInit(): void {
   this.actuService.getActualite().subscribe(data =>{
    this.actualite = data;
    this.dataSource = new MatTableDataSource(this.actualite);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number): void {
    this.actuService.deleteActualite(id).subscribe({
      next: res => {
        // Si la suppression est effectuée avec succès
        if (res) {
          Swal.fire({
            title: "Supprimé avec succès",
            text: "Actualité a été supprimé avec succès",
            icon: "success"
          });
        }
        //on met à jour le data liste
        this.dataSource = new MatTableDataSource(this.actualite);
      },
      error: err => {
        // Vérifier si la réponse d'erreur est liée à une suppression échouée
        if (err.status === 200) {
          // Cela peut se produire si la réponse contient un statut 200 pour la suppression réussie
          Swal.fire({
            title: "Supprimé avec succès",
            text: "Actualité a été supprimé avec succès",
            icon: "success"
          });
          this.dataSource = new MatTableDataSource(this.actualite);
        } else {
          this.snack.openSnackBar('Une erreur est survenue lors de la suppression.', err);
        }
      }
    });
  }

  openDialog(){
    const dialog = this.dialogRef.open(AjoutActuComponent,{
      width: '520px',
      height: '400px',
    });
    dialog.afterClosed().subscribe(result => {
      // Actualisez les données ici si nécessaire
      this.refreshData();
    });
  }

  editActualite(data:any){
    const dialog = this.dialogRef.open(AjoutActuComponent,{
      data
    });
    console.log("data envoye")
    dialog.afterClosed().subscribe(result => {
      // Actualisez les données ici si nécessaire
      this.refreshData();
    });
  }
  private refreshData() {
    // Logique d'actualisation des données (par exemple, appelez l'API pour obtenir les dernières données)
    this.actuService.getActualite().subscribe(data => {
      this.actualite = data;
      this.dataSource = new MatTableDataSource(this.actualite);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
