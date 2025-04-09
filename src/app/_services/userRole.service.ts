import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private selectedRoleSubject: BehaviorSubject<string>;
  public selectedRole$: Observable<string>;

  constructor() {
    // Inicializar con el valor guardado en localStorage o valor por defecto
    const initialRole = sessionStorage.getItem('selectedRole') || '';
    this.selectedRoleSubject = new BehaviorSubject<string>(initialRole);
    this.selectedRole$ = this.selectedRoleSubject.asObservable();
  }

  // Establecer el rol seleccionado
  setSelectedRole(role: string): void {
    // Guardar en localStorage para persistencia entre recargas
    sessionStorage.setItem('selectedRole', role);
    // Actualizar el BehaviorSubject para notificar a los componentes suscritos
    this.selectedRoleSubject.next(role);
  }

  // Obtener el rol seleccionado actual
  getSelectedRole(): string {
    return this.selectedRoleSubject.value;
  }

  // Limpiar el rol seleccionado (útil para logout)
  clearSelectedRole(): void {
    sessionStorage.removeItem('selectedRole');
    this.selectedRoleSubject.next('');
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.selectedRoleSubject.value === role;
  }
}