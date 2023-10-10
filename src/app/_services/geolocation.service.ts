import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  private coordinatesSubject = new Subject<{ latitude: number; longitude: number }>();

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
        { timeout: 2000 }
      );
    } else {
      this.coordinatesSubject.error(new Error('Geolocation is not available in this browser.'));
    }
    
  }

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
