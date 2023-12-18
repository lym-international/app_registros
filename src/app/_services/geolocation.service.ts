import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  private coordinatesSubject = new Subject<{ latitude: number; longitude: number }>();

  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      const timeoutDuration = 0; // Tiempo de espera en milisegundos
      const geolocationOptions = { timeout: timeoutDuration };
  
      const timeoutId = setTimeout(() => {
        // Tiempo de espera agotado
        const timeoutError = new Error('Tiempo de espera agotado al obtener la ubicación.');
        this.coordinatesSubject.error(timeoutError);
      }, timeoutDuration);
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId); // Borra el temporizador si la ubicación se obtiene con éxito
          const coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          this.coordinatesSubject.next(coordinates);
        },
        (error) => {
          clearTimeout(timeoutId); // Borra el temporizador si se produce un error
          // Manejar otros tipos de errores y mostrar mensajes específicos
          if (error.code === 3) {
            const timeoutError = new Error('Tiempo de espera agotado al obtener la ubicación.');
            this.coordinatesSubject.error(timeoutError);
          } else {
            this.coordinatesSubject.error(error);
          }
        },
        geolocationOptions
      );
    } else {
      this.coordinatesSubject.error(new Error('Geolocation is not available in this browser.'));
    }
  }
  
  /*
  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          this.coordinatesSubject.next(coordinates);
          
          //console.log('Coordenadas emitidas (servicio):', coordinates);
        },
        (error) => {
          this.coordinatesSubject.error(error);
        },
        { timeout: 3000 }
      );
    } else {
      this.coordinatesSubject.error(new Error('Geolocation is not available in this browser.'));
    }
    
  }
*/
  getCoordinatesObservable() {
    return this.coordinatesSubject.asObservable();
  }
}

/*
export class GeolocationService {

  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not available in this browser.'));
      }
    });
  }
}
*/
