/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ROUTES } from './sidebar-items';
import { AuthService, Role } from '@core';
import { RouteInfo } from './sidebar.metadata';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  routerObj;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.elementRef.nativeElement.closest('body');
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      this.userFullName =
        this.authService.currentUserValue.firstName +
        ' ' +
        this.authService.currentUserValue.lastName;
      this.userImg = this.authService.currentUserValue.img;

      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf('All') !== -1
      );
      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Client) {
        this.userType = Role.Client;
      } else if (userRole === Role.Employee) {
        this.userType = Role.Employee;
      } else {
        this.userType = Role.Admin;
      }
    }

    // this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
