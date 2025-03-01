import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetLocationVM } from '../../interfaces/locations/get-location-vm';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getLocations() {
    return this.http.get<GetLocationVM[]>(`${this.apiUrl}/api/location`, 
      { withCredentials: true }
    );
  }

  getLocationById(locationId: number) {
    return this.http.get<GetLocationVM>(`${this.apiUrl}/api/location/id=${locationId}`,
      { withCredentials: true }
    );
  }
}
