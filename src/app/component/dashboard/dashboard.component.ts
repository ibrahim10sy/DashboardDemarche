import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Actualite } from 'src/app/model/Actualite';
import { Admin } from 'src/app/model/Admin';
import { Bureau } from 'src/app/model/Bureau';
import { Guide } from 'src/app/model/Guide';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { AuthService } from 'src/app/service/auth.service';
import { BureauService } from 'src/app/service/bureau.service';
import { GuideService } from 'src/app/service/guide.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  guides : Guide [] = [];
  bureau : Bureau[]=[];
  user : Utilisateur[] = [];
  actu : Actualite[]=[];
  audioLink: HTMLAudioElement = new Audio(); // Déclaration de audioLink comme une instance de HTMLAudioElement
  isPlaying = false;
 // const storedAdminId = sessionStorage.getItem('idAdmin');
  adminRecup : Admin |undefined;

  constructor(private guideService: GuideService, private bureauSer:BureauService, private users : UtilisateurService, private router: Router, private authService: AuthService){
     this.guideService.getGuide().subscribe(guide =>{
      this.guides = guide;      
    })
    this.bureauSer.getBureau().subscribe(bureaux =>{
      this.bureau = bureaux
    })
    this.users.getUser().subscribe(user =>{
      this.user = user
    })
   
  }

  ngOnInit() {
    // Récupérer les informations de l'administrateur lors du démarrage du composant
    this.adminRecup = this.authService.getAdminConnecte();
    console.log("Admin recup dans dashboard onInit ", this.adminRecup);
  }
  

  playAudio(audioUrl: string) {
    if (this.isPlaying) {
      this.audioLink.pause();
    } else {
      this.audioLink.src = audioUrl; // Charger le nouveau lien audio
      this.audioLink.load(); // Charger le fichier audio
      this.audioLink.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  // openGuideDetail(id:number){
  //   this.guideService.getGuideById(id).subscribe(res => {
  //     console.log("detail du guide",res);
  //     this.router.navigate(['/guideDetail']);
  //   })
  // }
  // openGuideDetail(id: number) {
  //   this.guideService.getGuideById(id).subscribe(res => {
  //     console.log("detail du guide", res);
  //     this.router.navigate(['/guideDetail'], { state: { guideDetail: res} });
  //   });
  // }

  openGuide(guide : Guide){
    console.log("open guide", guide);
    this.router.navigate(['/guideDetail'], { state: { guide: guide}});
  }
   openProfile(admin:Admin){
    console.log("open profile", admin);
    this.router.navigate(['/profil'], { state: { admin: admin}});
   }
}
