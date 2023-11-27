import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


interface SideNavToggle {
  screenWidht : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demarcheProjet';

  isLoginPage: boolean = false;
  isBlankPage : boolean = false;

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.isBlankPage = event.url ==='/';
      }
      if(event instanceof NavigationEnd){
        this.isLoginPage = event.url ==='/login'
      }
    })
  } 


  isSideNavCollapsed = false;
  screenWidht = 0;

  onToggleSideNav(data : SideNavToggle): void{
    this.screenWidht = data.screenWidht;
    this.isSideNavCollapsed = data.collapsed;
  }
}
