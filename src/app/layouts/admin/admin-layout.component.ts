import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems, Menu, ChildrenItems } from '../../shared/menu-items/menu-items';
import { HorizontalMenuItems } from '../../shared/menu-items/horizontal-menu-items';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface,
PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MenuFromServer } from 'app/model/menu-from-server.model';
import * as _ from 'lodash';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  today: number = Date.now();
  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  horizontal: boolean = false;
  sidebarBg: boolean = true;
  currentLang = 'en';
  layoutDir = 'ltr';

  menuLayout           : any = 'vertical-menu';
  selectedSidebarImage : any = 'bg-1';
  selectedSidebarColor : any = 'sidebar-default';
  selectedHeaderColor  : any = 'header-default';
  collapsedClass       : any = 'side-panel-opened';

  @ViewChild('sidemenu') sidemenu;
  public config: PerfectScrollbarConfigInterface = {};
  lstMenuRoot: MenuFromServer[] = [];
  _menu: Menu[] = [];
  _subMenu: ChildrenItems[];

  constructor(
    private _commonServices: CommonService,
    private router: Router, 
    public menuItems: MenuItems, 
    public horizontalMenuItems : HorizontalMenuItems, 
    public translate: TranslateService ) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    
  }

  ngOnInit(): void {

    const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar && this.layoutDir != 'rtl') {
      const ps = new PerfectScrollbar(elemSidebar, {
                              wheelSpeed: 2,
                              suppressScrollX: true
                            });
    }

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.url = event.url;
      if (this.isOver()) {
        this.sidemenu.close();
      }

      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar && this.layoutDir != 'rtl') {
        // Ps.update(elemContent);
      }
    });
  }
    
  ngAfterViewInit() {
    this.filterMenu(JSON.parse(localStorage.getItem("lMenu")));
  }
  
  filterMenu(lstMenu: MenuFromServer[]){
    this.lstMenuRoot = _.filter(lstMenu, function(o) { return o.parentId == 0 });
    for (let entry of this.lstMenuRoot) {
      const r2 = _.filter(lstMenu, function(o) { return o.parentId == entry.controlId })
      this._subMenu = [];
      for (let child of r2) {
        this._subMenu.push({state: child.pathFile, name: child.name})
      }
      
      if(this._subMenu.length === 0){
        const child = {
          state: entry.pathFile,
          name: entry.name,
          link: true,
          type: "link",
          icon: "explore"
        }
        this._menu.push(child);
      } else {
        const child = {
          state: entry.pathFile,
          name: entry.name,
          link: false,
          type: 'sub',
          icon: 'explore',
          children: this._subMenu
        }
        this._menu.push(child);
      }
    }
    console.log(this._menu);
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
    setTimeout(() => {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar && this.layoutDir != 'rtl') {
        const ps = new PerfectScrollbar(elemSidebar, {
                              wheelSpeed: 2,
                              suppressScrollX: true
                            });
      }
    }, 350);
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }
  
  menuToggleFunc()
  {
    this.sidemenu.toggle();
    
    if(this.collapsedClass == 'side-panel-opened')
    {
        this.collapsedClass = 'side-panel-closed';
    }
    else
    {
        this.collapsedClass= 'side-panel-opened';
    }
  }

  changeMenuLayout(value)
  {
    console.log(value)
    if(value)
    {
      this.menuLayout = 'top-menu';
    }
    else
    {
      this.menuLayout = 'vertical-menu';
      this.menuToggleFunc();
    }
  }
  
  onSelectSidebarImage(selectedClass, event)
  {
    this.selectedSidebarImage = selectedClass;
  }
  
  onSelectedSidebarColor(selectedClass)
  {
    this.selectedSidebarColor = selectedClass;
  }
  
  onSelectedHeaderColor(selectedClass)
  {
    this.selectedHeaderColor = selectedClass;
  }

  isBgActive(value)
  {
    if(value == this.selectedSidebarImage)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isSidebarActive(value)
  {
    if(value == this.selectedSidebarColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isHeaderActive(value)
  {
    if(value == this.selectedHeaderColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
