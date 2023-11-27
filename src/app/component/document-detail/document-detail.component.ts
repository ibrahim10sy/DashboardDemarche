import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {

  audioLink: HTMLAudioElement = new Audio();
  isPlaying = false;
  document:any;
  constructor( private route: ActivatedRoute){}

  ngOnInit(): void {
    this.document= history.state.document;
    console.log('Données du document récupérées :', this.document); 
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
}
