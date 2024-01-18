import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'app/_models/user';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { catchError } from 'rxjs/operators'; //Diego
import { throwError } from 'rxjs'; //Diego
import * as CryptoJS from 'crypto-js'; //Jairo
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public auxCurrentUser = null;
  // public userinfo:User;
  public userinfo: User = new User();
  public returnUrl: string;
  // fb: firebase.app.App;
  // fb: firebase.app.App | null = null;
  loading = false;
  // user$: Observable<any>;
  user$: Observable<any> = new Observable<any>();
  messageService: any; //Diego
  private data: any;
  public currentUserData: any; // Nueva variable para almacenar los datos del usuario
  //private authentication: Auth;
  private secretKey = 'jairo@adminl&m';
  
  
  private isAuthenticatingSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticating$ = this.isAuthenticatingSubject.asObservable();

  constructor(
    private http: HttpClient,
    public auth: AngularFireAuth,
    private db: AngularFirestore,
    // private db:
    private router: Router,
    //private messageService: MessageService,
    private route: ActivatedRoute
    // private notifSvc: NotificationsService,
  ){
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    );
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.auth.authState.subscribe((user) => {
      if (!user) {
        sessionStorage.setItem('currentUser', '');
      }
    });
  
  }

  decryptData(encryptedData: string): string {
    try {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        this.secretKey
      ).toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } catch (error) {
      console.error('Error :', error);
      return null;
    }
  }

  private extractOriginalString(alteredString: string): string {
    const parts = alteredString.split('_');
    if (parts.length >= 3) {
      return parts[1];
    } else {
      return alteredString;
    }
  }
  initialize() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.isAuthenticatingSubject.next(true);
        // console.log("token", token);
        // const tk = token.replace(/["']/g, '');
        // console.log("cirpted", tk);
        
        const receivedToken = token.replace(/-/g, '+').replace(/_/g, '/');
        const decryptedToken = this.decryptData(receivedToken);
        // const decryptedToken = this.decryptData(tk);
        if (decryptedToken) {
          try {
            const userData = JSON.parse(decryptedToken);
            const username = userData.username;
            const password = userData.pass;
            const pass = this.extractOriginalString(password);
           
            this.login(username, pass);
            
          } catch (error) {
            console.error('Error al analizar la cadena desencriptada:', error);
          }
        } else {
          this.isAuthenticatingSubject.next(false);
          console.error('La cadena desencriptada es nula o vacía.');
        }
      }
    })
  }
  login(username: string, password: string) {
   /*  setTimeout(() => {
      this.isAuthenticatingSubject.next(false);
    }, 1500); */
    this.auth
      .signInWithEmailAndPassword(username, password)
      .then((user) => {
        // console.log('usuario autenticado con exito!', user.user?.email);

        this.db
          .collection('Users', (ref) => ref.where('email', '==', username))
          .get()
          .subscribe((usersInfo) => {
            usersInfo.docs.forEach((item: any) => {
              const data = item.data();
              // console.log('DATA ::', item.data());
              sessionStorage.setItem('currentUser', JSON.stringify(data));
              this.currentUserSubject.next(data);
              this.currentUserData = data; // diego 8-7 : Almacenar los datos del usuario en currentUserData
              localStorage.setItem('currentUserData', JSON.stringify(data));

              this.setData(data);
              setTimeout(() => {
                this.isAuthenticatingSubject.next(false);
              }, 1000);
              // this.auxCurrentUser = user;
              // const auxDate = new Date();
              // const date = new Date(auxDate.getTime() - (auxDate.getTimezoneOffset() * 60000));

              if (this.currentUserData.role == 'Employee') {
                console.log('Es Empleado');
                this.router.navigate(['/admin/search-order']);
              } else if (this.currentUserData.role == 'Client') {
                console.log('Es cliente');
                this.router.navigate(['/admin/search-order/']);
              } else if (this.currentUserData.role == 'Executive') {
                console.log('Executive');
              } else if (this.currentUserData.role == 'Supervisor') {
                console.log('Es Supervisor');
                this.router.navigate(['/admin/search-order/']);
              } else if (this.currentUserData.role == 'Administrator') {
                console.log('Es administrador');
                this.router.navigate(['/admin/search-order/']);
              } else {
                this.router.navigate(['/authentication/signin']);
              }
            });
          });
      })
      .catch((error) => {
        this.isAuthenticatingSubject.next(false);
        switch (error.code) {
          case 'auth/wrong-password':
            console.log('error1', error.message);
            this.messageService.messageWarning(
              'Warning',
              'The password is invalid or the user does not have a password.'
            );
            break;
          case 'auth/too-many-requests':
            console.log('error2', error.message);
            this.messageService.messageWarning(
              'Warning',
              'Too many unsuccessful login attempts. Please try again later.'
            );
            break;
          default:
            console.log('error3', error.message);
            this.messageService.messageWarning('Warning', error.message);
            break;
        }
      });
  }


  setData(data: any) {
    this.data = data;
  }

  getData() {
    //return this.data;
    return this.currentUserData;
  }

  changePassword(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth
        .sendPasswordResetEmail(email)
        .then((user) => {
          console.log(
            'OK',
            'You can receive the instruction to reset password to ' + email
          );
          resolve(true);
        })
        .catch((error) => {
          console.log('Warning', error.message);
          reject(false);
        });
    });
  }
  /*
  changePassword(email: string) {
    console.log("e-mail:",email)
    this.auth.sendPasswordResetEmail(email).then((user) => {
      console.log('OK', 'You can recieve the instruction to reset password to ' + email)
      // this.messageService.messageSuccess('OK', 'You can recieve the instruction to reset password to ' + email );
        return true;
      }).catch((error) => {
        console.log("Warning",error.message)
        // this.messageService.messageWarning("Warning",error.message);
    })
    return false;
}
*/

  logout() {
    this.isAuthenticatingSubject.next(false);
    this.auth.signOut().then(() => {
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserData')
      this.currentUserSubject.next(null);
      this.auxCurrentUser = null;
      this.currentUserData = null; // Restablecer currentUserData a null
      this.router.navigate(['pages/login']);
    });
  }
}
