import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  getDepartments() {
    return this.http.get<any>(
      `${this.apiUrl}/api/department`, 
      { withCredentials: true }
    );
  }

  addDepartment(name : string, locationId : number) {
    return this.http.post<{name : string, locationId : number}>(
      `${this.apiUrl}/api/department`, 
      { departmentName: name, locationId: locationId } ,
      { withCredentials: true }
    );
  }

  deleteDepartment(departmentId: number) {
    return this.http.delete(
      `${this.apiUrl}/api/department/id=${departmentId}`, 
      { withCredentials: true }
    );
  }

  updateDepartment(departmentId: number, name: string, locationId: number) {
    return this.http.put<{name: string, locationId: number}>(
      `${this.apiUrl}/api/department/id=${departmentId}`, 
      {departmentName: name, locationId: locationId}, 
      { withCredentials: true }
    );
  }
}
