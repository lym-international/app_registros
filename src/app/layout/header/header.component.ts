import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { LanguageService, InConfiguration, AuthService } from '@core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { FontAwesomeComponent } from 'app/icons/font-awesome/font-awesome.component';


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
  public datosUsuario: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    public authenticationService: AuthenticationService,
    
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    //{ text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' }, // DARM
    //{ text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' }, // DARM
  ];
  /*notifications: Notifications[] = [
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
  ]*/
  
  @Output() datosUsuarioEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    //const userRole = this.authService.currentUserValue.role;
    //this.userImg = this.authService.currentUserValue.img;
    this.config = this.configService.configData;
    this.dataUser = this.authenticationService.getData();
    
    this.setHeaderProperties();

    // Intentar recuperar los datos del usuario del localStorage
    // const storedUserData = localStorage.getItem('currentUserData');
    const storedUserData = sessionStorage.getItem('currentUserData');

    

    if (storedUserData) {
      this.dataUser = JSON.parse(storedUserData);
    } else {
      // Si no se encuentran los datos en el localStorage, obtenerlos del servicio
      this.dataUser = this.authenticationService.getData();
      // Almacenar los datos en el localStorage
      // localStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
      sessionStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
    }
    // Acceso a los datos del usuario en la variable dataUser
    // console.log('Datos en storedUserData desde el HEADER: ', storedUserData);
    // console.log('dataUser ==> ', this.dataUser)
    
    this.datosUsuario = this.dataUser;
    this.datosUsuarioEmitter.emit(this.datosUsuario);
    // console.log('Datos Usuario EMITER: ',this.datosUsuario)
    
    /*if (userRole === 'Admin') { 
      this.homePage = 'admin/search-order';
    } else if (userRole === 'Client') {
      this.homePage = 'client/dashboard';
    } else if (userRole === 'Employee') {
      this.homePage = 'employee/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }*/

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

  hasToken(): boolean {
    const token = sessionStorage.getItem('accessToken');    
    return !!token; // Returns true if token is present, false otherwise
  }
  

  redirectToExternalUrl() {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      // Redirige a la URL externa con el token como parámetro
       //https://register.highkeystaff.com/#/authentication/signin
      //  https://highkeystaff.web.app/dashboard
       window.location.href= 'http://localhost:4200/dashboard'
      // window.location.href = `https://register.highkeystaff.com/#/authentication/signin/?token=${token}`;
    } else {
      console.error('Token de acceso no presente en sessionStorage.');
      // Manejar la ausencia de token (puede redirigir a una página de error)
      // this.router.navigate(['/error']);
    }
  }
  
  setHeaderProperties() {
    // Restaurar propiedades del encabezado aquí
    // Restaurar el color de fondo (al cargar la página se perdía el color de fondo).
    const headerElement = this.elementRef.nativeElement as HTMLElement;
    headerElement.style.backgroundColor = '#004674 !important';
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

  this.authenticationService.logout(); //jairo

    /* this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    }); */
  }
}
