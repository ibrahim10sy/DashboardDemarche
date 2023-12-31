import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bureau } from 'src/app/model/Bureau';
import { BureauService } from 'src/app/service/bureau.service';
import { AjoutBureauComponent } from '../ajout-bureau/ajout-bureau.component';
import Swal from 'sweetalert2';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.css']
})
export class BureauComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'ville', 'adresse', 'longitude', 'latitude', 'action'];
  dataSource = new MatTableDataSource<Bureau>();
  bureaux: Bureau[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bureauService: BureauService, private dialogRef: MatDialog, private snack: CoreService) {}

  ngOnInit(): void {
    this.loadBureaux();
  }

  loadBureaux(): void {
    this.bureauService.getBureau().subscribe(bureau => {
      this.bureaux = bureau;
      this.dataSource = new MatTableDataSource(this.bureaux);
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

  openDialog(): void {
    const dialogRef = this.dialogRef.open(AjoutBureauComponent, {
      width: '340px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir les données après la fermeture de la boîte de dialogue
      this.loadBureaux();
    });
  }

  editBureau(data: any) {
    const dialogRef = this.dialogRef.open(AjoutBureauComponent, {
      data
    });
    console.log("Data envoyé", data);
    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir les données après la fermeture de la boîte de dialogue
      this.loadBureaux();
    });
  }

  onDelete(id: number): void {
    this.bureauService.deleteBureau(id).subscribe({
      next: res => {
        // Si la suppression est effectuée avec succès
        if (res) {
          Swal.fire({
            title: "Voulez-vous supprimé",
            text: "Attention vous allez supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#red",
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
        this.bureaux = this.bureaux.filter(bure => bure.idBureau !== id);

        // Mettre à jour la source de données MatTable
        this.dataSource.data = this.bureaux;
      },
      error: err => {
        // Vérifier si la réponse d'erreur est liée à une suppression échouée
        if (err.status === 200) {
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
          this.bureaux = this.bureaux.filter(bure => bure.idBureau !== id);

          // Mettre à jour la source de données MatTable
          this.dataSource.data = this.bureaux;
        } else {
          this.snack.openSnackBar('Une erreur est survenue lors de la suppression du bureau.', err);
        }
      }
    });
  }
}
