import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'app/_models/user';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { catchError } from 'rxjs/operators'; //Diego
import { throwError } from 'rxjs'; //Diego




@Injectable({
  providedIn: 'root'
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


  constructor(
      private http: HttpClient,
      public auth: AngularFireAuth,
      private db: AngularFirestore,
      // private db:
      private router: Router,
      //private messageService: MessageService,
      private route: ActivatedRoute,
      // private notifSvc: NotificationsService,
      
      ) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || 'null'));
      // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      
      this.auth.authState.subscribe(user => {
        if (!user) {
          sessionStorage.setItem('currentUser', '');
        }
      });

      //const authen = new Auth();
      //this.authentication = authen;
    }
    
    login(username: string, password: string ) {
      this.auth.signInWithEmailAndPassword(username, password).then((user) => {
        console.log("usuario autenticado con exito!", user.user?.email)
        this.db.collection('Users',ref => ref.where('email', '==', username)).get().subscribe((usersInfo) => {
          usersInfo.docs.forEach((item:any) => {
            const data = item.data();
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);
            this.currentUserData = data; // diego 8-7 : Almacenar los datos del usuario en currentUserData
            localStorage.setItem('currentUserData', JSON.stringify(data));
            console.log('Datos del usuario almacenados en localStorage:', data);
            console.log('currentUserData: ', this.currentUserData.firstname)
            console.log("nombre: ", data.firstname, data.lastname)
            console.log("role: ", data.role)
            
            this.setData(data)
            // this.auxCurrentUser = user;
            // const auxDate = new Date();
            // const date = new Date(auxDate.getTime() - (auxDate.getTimezoneOffset() * 60000));
            
            if(this.currentUserData.role=="Employee"){
              console.log("Es Empleado")
                this.router.navigate(['/admin/search-order']);
            } else if (this.currentUserData.role=="Client"){
                this.router.navigate(['/client/dashboard']);
            } else if (this.currentUserData.role=='Executive'){
              console.log("Executive")
            } else if (this.currentUserData.role == "Supervisor"){
                console.log("Supervisor")
            } else if (this.currentUserData.role=="Administrator"){
              console.log("Es administrador")
              this.router.navigate(['/admin/search-order/']);
            } else {
              this.router.navigate(['/authentication/signin']); 
            }
          });
        });
      })
            .catch((error) => {
              switch (error.code) {
                case "auth/wrong-password":
                  console.log("error1", error.message);
                  this.messageService.messageWarning("Warning","The password is invalid or the user does not have a password.");
                  break;
                case "auth/too-many-requests":
                  console.log("error2", error.message);
                  this.messageService.messageWarning("Warning","Too many unsuccessful login attempts. Please try again later.");
                  break;
                default:
                  console.log("error3", error.message);
                  this.messageService.messageWarning("Warning", error.message);
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
        this.auth.sendPasswordResetEmail(email).then((user) => {
          console.log('OK', 'You can receive the instruction to reset password to ' + email);
          resolve(true);
        }).catch((error) => {
          console.log("Warning", error.message);
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
    this.auth.signOut().then(() => {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.auxCurrentUser = null;
        this.currentUserData = null; // Restablecer currentUserData a null
        this.router.navigate(['pages/login']);
    })
}
} 
