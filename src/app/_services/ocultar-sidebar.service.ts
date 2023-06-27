import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcultarSidebarService {

  constructor() { }
  
  private mostrarSidebarSubject: Subject<boolean> = new Subject<boolean>();
  mostrarSidebar$ = this.mostrarSidebarSubject.asObservable();
  

  ocultarSidebar(): void {
    this.mostrarSidebarSubject.next(false); 

    
  }
  
  
}


