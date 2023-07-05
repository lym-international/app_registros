import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { LanguageService, InConfiguration, AuthService } from '@core';
import { AuthenticationService } from 'app/_services/authentication.service';


interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  userImg?: string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement: HTMLElement | undefined;
  isFullScreen = false;
  public dataUser!: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    public authenticationService: AuthenticationService
    
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    //{ text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' }, // DARM
    //{ text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' }, // DARM
  ];
  notifications: Notifications[] = [
    {
      message: 'Please check your mail',
      time: '14 mins ago',
      icon: 'mail',
      color: 'nfc-green',
      status: 'msg-unread',
    },
    {
      message: 'New Employee Added..',
      time: '22 mins ago',
      icon: 'person_add',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Your leave is approved!! ',
      time: '3 hours ago',
      icon: 'event_available',
      color: 'nfc-orange',
      status: 'msg-read',
    },
    {
      message: 'Lets break for lunch...',
      time: '5 hours ago',
      icon: 'lunch_dining',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Employee report generated',
      time: '14 mins ago',
      icon: 'description',
      color: 'nfc-green',
      status: 'msg-read',
    },
    {
      message: 'Please check your mail',
      time: '22 mins ago',
      icon: 'mail',
      color: 'nfc-red',
      status: 'msg-read',
    },
    {
      message: 'Salary credited...',
      time: '3 hours ago',
      icon: 'paid',
      color: 'nfc-purple',
      status: 'msg-read',
    },
  ];
  ngOnInit() {
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;
    this.dataUser = this.authenticationService.getData();
    

    if (userRole === 'Admin') { 
      this.homePage = 'admin/search-order';
    } else if (userRole === 'Client') {
      this.homePage = 'client/dashboard';
    } else if (userRole === 'Employee') {
      this.homePage = 'employee/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.jpg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }

  callFullscreen() {
    if (!this.isFullScreen) {
      this.docElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
