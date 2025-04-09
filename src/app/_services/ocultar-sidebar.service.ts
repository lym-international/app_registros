import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcultarSidebarService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }
  
  private mostrarSidebarSubject: Subject<boolean> = new Subject<boolean>();
  mostrarSidebar$ = this.mostrarSidebarSubject.asObservable();
  

  ocultarSidebar(): void {
    this.mostrarSidebarSubject.next(false); 

    
  }
  
  
}


