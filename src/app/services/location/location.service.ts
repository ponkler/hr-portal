import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getLocations() {
    return this.http.get<any>(`${this.apiUrl}/api/location`, { withCredentials: true });
  }
}
