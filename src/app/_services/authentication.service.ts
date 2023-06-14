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


    constructor(
      private http: HttpClient,
      public auth: AngularFireAuth,
      private db: AngularFirestore,
      // private db:
      private router: Router,
      // private messageService:MessageService,
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
      
    }
    // Diego: adiciono Observable <any>
    login(username: string, password: string ): Observable<any>  {
      this.auth.signInWithEmailAndPassword(username, password).then((user) => {
            console.log("usuario autenticado con exito!", user.user?.email)
            this.db.collection('Users',ref => ref.where('email', '==', username)).get().subscribe((usersInfo) => {
                  usersInfo.docs.forEach((item:any) => {
                      const data = item.data();
                      sessionStorage.setItem('currentUser', JSON.stringify(data));
                      this.currentUserSubject.next(data);
                      console.log("nombre: ", data.firstname, data.lastname)
                      console.log("role: ", data.role)
                      // this.auxCurrentUser = user;
                      // const auxDate = new Date();
                      // const date = new Date(auxDate.getTime() - (auxDate.getTimezoneOffset() * 60000));
                      if(data.role=="Employee")
                      {
                          // this.router.navigate(['/profile']);
                          this.router.navigate(['/employee/dashboard']);
                      }
                      else if (data.role=="Client")
                      {
                          // this.router.navigate(['/orders']);
                          this.router.navigate(['/client/dashboard']);
                      }
                      else if (data.role=='Executive')
                      {
                        // this.router.navigate(['/orders'])
                        console.log("Executive")
                      }
                      else if (data.role == "Supervisor")
                      {
                          // this.router.navigate(['/register'])
                          console.log("Supervisor")
                      }
                      else if (data.role=="Administrator")
                      {
                         //console.log("si es admin")
                        this.router.navigate(['/admin/search-order']); // '/admin/dashboard/main'
                          // this.router.navigate(['/dashboard']);
                      }
                      else
                      {
                          // this.router.navigate([this.returnUrl]);
                          this.router.navigate(['/authentication/signin']);
                      }
                  });
              });
            })
            .catch((error) => {
              switch (error.code) {
                case "auth/wrong-password":
                  console.log("error1", error.message);
                  // this.messageService.messageWarning("Warning","The password is invalid or the user does not have a password.");
                  break;
                case "auth/too-many-requests":
                  console.log("error2", error.message);
                  // this.messageService.messageWarning("Warning","Too many unsuccessful login attempts. Please try again later.");
                  break;
                default:
                  console.log("error3", error.message);
                  // this.messageService.messageWarning("Warning", error.message);
                  break;
              }
            });
           
        // });
        return of({ success: true, message: 'Autenticación exitosa' });

  }

  changePassword(email: string) {
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

  logout() {
    this.auth.signOut().then(() => {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.auxCurrentUser = null;
        this.router.navigate(['pages/login']);
    })
}
} 
