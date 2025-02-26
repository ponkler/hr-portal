import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetDepartmentVM } from '../../interfaces/department/get-department-vm';
import { CreateDepartmentVM } from '../../interfaces/department/create-department-vm';
import { UpdateDepartmentVM } from '../../interfaces/department/update-department-vm';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  getDepartments() {
    return this.http.get<GetDepartmentVM[]>(
      `${this.apiUrl}/api/department`, 
      { withCredentials: true }
    );
  }

  getDepartmentById(departmentId: number) {
    return this.http.get<GetDepartmentVM>(
      `${this.apiUrl}/api/department/id=${departmentId}`, 
      { withCredentials: true }
    );
  }

  getDepartmentsByLocation(locationId: number) {
    return this.http.get<GetDepartmentVM[]>(
      `${this.apiUrl}/api/department/location=${locationId}`, 
      { withCredentials: true }
    );
  }

  addDepartment(department: CreateDepartmentVM) {
    return this.http.post<GetDepartmentVM>(
      `${this.apiUrl}/api/department`, 
      { department } ,
      { withCredentials: true }
    );
  }

  deleteDepartment(departmentId: number) {
    return this.http.delete(
      `${this.apiUrl}/api/department/id=${departmentId}`, 
      { withCredentials: true }
    );
  }

  updateDepartment(departmentId: number, department: UpdateDepartmentVM) {
    return this.http.put(
      `${this.apiUrl}/api/department/id=${departmentId}`, 
      { department }, 
      { withCredentials: true }
    );
  }
}
