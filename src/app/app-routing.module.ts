import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { GuidesComponent } from './component/guides/guides.component';
import { ForumComponent } from './component/forum/forum.component';
import { CalendrierComponent } from './component/calendrier/calendrier.component';
import { ActualiteComponent } from './component/actualite/actualite.component';
import { MapComponent } from './component/map/map.component';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { BureauComponent } from './component/bureau/bureau.component';
import { DetailGuideComponent } from './component/detail-guide/detail-guide.component';
import { DocumentComponent } from './component/document/document.component';
import { DocumentDetailComponent } from './component/document-detail/document-detail.component';
import { ProfilComponent } from './component/profil/profil.component';

const routes: Routes = [
  {path : '', redirectTo:'login', pathMatch:'full'},
  {path :'login', component: LoginComponent},
  // {path : '', redirectTo:'dashboard', pathMatch:'full'},
  {path : 'profil', component: ProfilComponent},
  {path : 'guideDetail', component: DetailGuideComponent},
  {path : 'documentDetail', component: DocumentDetailComponent},
  {path : 'document', component: DocumentComponent},
  {path : 'dashboard', component: DashboardComponent},
  {path : 'bureau', component: BureauComponent},
  {path : 'guide', component: GuidesComponent},
  {path : 'forum', component: ForumComponent},
  {path : 'calendrier', component: CalendrierComponent},
  {path : 'actualite', component: ActualiteComponent},
  {path : 'map', component: MapComponent},
  {path : 'utilisateur', component: UtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
