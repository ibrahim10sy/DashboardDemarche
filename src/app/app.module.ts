import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActualiteComponent } from './component/actualite/actualite.component';
import { AjoutBureauComponent } from './component/ajout-bureau/ajout-bureau.component';
import { CalendrierComponent } from './component/calendrier/calendrier.component';
import { MapComponent } from './component/map/map.component';
import { ForumComponent } from './component/forum/forum.component';
import { GuidesComponent } from './component/guides/guides.component';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { BureauComponent } from './component/bureau/bureau.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AddGuideComponent } from './component/add-guide/add-guide.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AjoutActuComponent } from './component/ajout-actu/ajout-actu.component';
import { DetailGuideComponent } from './component/detail-guide/detail-guide.component';
import { DocumentComponent } from './component/document/document.component';
import { AjoutDocumentComponent } from './component/ajout-document/ajout-document.component';
import { DocumentDetailComponent } from './component/document-detail/document-detail.component';
import { ProfilComponent } from './component/profil/profil.component';
import { FormsModule } from '@angular/forms';
import { EditEventComponent } from './component/edit-event/edit-event.component';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    ActualiteComponent,
    AjoutBureauComponent,
    CalendrierComponent,
    MapComponent,
    ForumComponent,
    GuidesComponent,
    UtilisateurComponent,
    BureauComponent,
    AddGuideComponent,
    AjoutActuComponent,
    DetailGuideComponent,
    DocumentComponent,
    AjoutDocumentComponent,
    DocumentDetailComponent,
    ProfilComponent,
    EditEventComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FullCalendarModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
