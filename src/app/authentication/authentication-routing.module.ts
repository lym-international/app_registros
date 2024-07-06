import { Injectable, NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockedComponent } from "./locked/locked.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
import { SearchOrderComponent } from "app/admin/search-order/search-order.component";
import { AuthenticationService } from "app/_services/authentication.service";


/* @Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    console.log("can active", this.authService.isInitialized)
    if (this.authService.isInitialized) {
      this.authService.isInitialized = false;
      this.router.navigate(['/search-order']);
      return false; // Evita que se cargue la ruta original cuando se inicializa
    }
    return true; // Continúa con la carga normal de la ruta
  }
} */
const routes: Routes = [
  
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  
  {
    path: "signin",
    component: SigninComponent,
  },
  /* {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuardService], //  redirigir según la condición
  }, */
  {
    path: "search-order",
    component: SearchOrderComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "locked",
    component: LockedComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "page500",
    component: Page500Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
