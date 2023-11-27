import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Utilisateur } from "src/app/model/Utilisateur";
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import Swal from 'sweetalert2';
import { CoreService } from 'src/app/service/core.service';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email','image','action'];  
  dataSource = new MatTableDataSource<Utilisateur>();
  users: Utilisateur[] = [];
 
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UtilisateurService, private snack : CoreService) {
   
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.users = user;
      this.dataSource = new MatTableDataSource(this.users);
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
  onDelete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: res => {
        // Si la suppression est effectuée avec succès
        if (res) {
          Swal.fire({
            title: "Supprimé avec succès",
            text: "Le guide a été supprimé avec succès",
            icon: "success"
          });
        }
        this.users = this.users.filter(user => user.idUtilisateur !== id);

        // Mettre à jour la source de données MatTable
        this.dataSource.data = this.users;
      },
      error: err => {
        // Vérifier si la réponse d'erreur est liée à une suppression échouée
        if (err.status === 200) {
          // Cela peut se produire si la réponse contient un statut 200 pour la suppression réussie
          Swal.fire({
            title: "Supprimé avec succès",
            text: "Utilisateur supprimé avec succèss a été supprimé avec succès",
            icon: "success"
          });
          this.users = this.users.filter(user => user.idUtilisateur !== id);

          // Mettre à jour la source de données MatTable
          this.dataSource.data = this.users;
        } else {
          this.snack.openSnackBar('Une erreur est survenue lors de la suppression .', err);
        }
      }
    });
  }
  

}
