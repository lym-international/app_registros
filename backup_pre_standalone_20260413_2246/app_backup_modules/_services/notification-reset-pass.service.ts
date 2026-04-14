
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationResetPassService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000, // Duración en milisegundos
      panelClass: 'success-snackbar', // Clase de estilo CSS personalizada para mensajes de éxito
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: 'error-snackbar', // Clase de estilo CSS personalizada para mensajes de error
    });
  }
}
