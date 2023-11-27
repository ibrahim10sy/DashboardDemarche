import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

 
  
  calendarOptions: any; // Vous pouvez remplacer "any" par un type approprié
  events: any[] = []; // Tableau pour stocker les événements

  // Propriétés pour la création d'un nouvel événement
  eventName: string = "";
  date: string = "";

  // ngOnInit() {
  //   // Récupérer les événements depuis le local storage lors de l'initialisation
  //   const storedEvents = localStorage.getItem('events');

  //   if (storedEvents) {
  //     this.events = JSON.parse(storedEvents);
  //   }

  //   // Configuration de FullCalendar
  //   this.calendarOptions= {
  //     initialView: 'dayGridMonth',
  //     weekends: true,
  //     events: this.getEvents.bind(this) // Utilisation d'une fonction asynchrone pour récupérer les événements
  //   };
  //   this.calendarOptions= {
  //     initialView: 'dayGridMonth',
  //     weekends: true,
  //     plugins: [dayGridPlugin, interactionPlugin], // Ajouter les plugins ici
  //     events: this.getEvents.bind(this)
  //   };
  // }
  constructor(private dialogRef: MatDialog){}
  ngOnInit() {
    // Récupérer les événements depuis le local storage lors de l'initialisation
    const storedEvents = localStorage.getItem('events');
  
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
    
    // Configuration de FullCalendar
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      weekends: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this), // Ajout de eventClick
      plugins: [dayGridPlugin, interactionPlugin], 
      events: this.getEvents.bind(this) // Utilisation d'une fonction asynchrone pour récupérer les événements
    };
  }
  handleDateClick(dateClickInfo: DateClickArg) {
    const newEvent = {
      title: this.eventName, // Supposons que this.eventName ait été défini quelque part dans votre composant
      date: dateClickInfo.date
    };
  
    // Maintenant, vous pouvez utiliser 'newEvent' comme vous le souhaitez, par exemple, l'envoyer à votre boîte de dialogue
    const dialog = this.dialogRef.open(EditEventComponent, {
      data: newEvent,
      width: '150px',
      height: '150px'
    });
    console.log("Nouvel événement cliqué", newEvent);
  }
  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;
    const dialog = this.dialogRef.open(EditEventComponent, {
      data: event,
      width: '150px',
      height: '150px'
    });
    console.log("Événement cliqué", event);
  }

  // Méthode pour créer un nouvel événement
  createEvent() {
    const newEvent = {
      title: this.eventName,
      date: this.date
    };
    console.log("event est ",newEvent);
    // Ajouter le nouvel événement à la liste des événements
    this.events.push(newEvent);

    // Mettre à jour le local storage avec la nouvelle liste d'événements
    localStorage.setItem('events', JSON.stringify(this.events));
    this.events;
    // Réinitialiser les champs du formulaire
    this.eventName = "";
    this.date = "";
  }

  deleteEvent(index: number) {
    // Supprimer l'événement du tableau
    this.events.splice(index, 1);

    // Mettre à jour le local storage avec le tableau mis à jour
    localStorage.setItem('events', JSON.stringify(this.events));
  }
  // Fonction asynchrone pour obtenir les événements depuis le local storage
  async getEvents(info:any, successCallback:any, failureCallback:any) {
    try {
      const storedEvents = localStorage.getItem('events');

      if (storedEvents) {
        const events = JSON.parse(storedEvents);
        successCallback(events);
      } else {
        successCallback([]); // Aucun événement s'il n'y a rien dans le local storage
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des événements : ", error);
      failureCallback(error);
    }
  }

  
}
