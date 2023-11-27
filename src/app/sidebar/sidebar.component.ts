import { Component,HostListener,OnInit,Output } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


interface SideNavToggle {
  screenWidht : number,
  collapsed : boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  navData = navbarData;
  screenWidht=0;

  isLoginPage: boolean = false;
  // isBlankPage : boolean = false;

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage =  event.url === 'login';
      }
    });
  }

  ngOnInit(): void {
    this.screenWidht = window.innerWidth;
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event : any){
    this.screenWidht = window.innerWidth;
    if(this.screenWidht == window.innerWidth){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
    }
  }
  toggleCollapse() : void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
  }
  closeSidenav() : void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
  }
}
