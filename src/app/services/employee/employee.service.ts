import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetEmployeeVM } from '../../interfaces/employees/get-employee-vm';
import { CreateEmployeeVM } from '../../interfaces/employees/create-employee-vm';
import { UpdateEmployeeVM } from '../../interfaces/employees/update-employee-vm';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  getEmployees() {
    return this.http.get<GetEmployeeVM[]>(
      `${this.apiUrl}/api/employee`, 
      { withCredentials: true }
    );
  }

  getEmployeeById(employeeId: number) {
    return this.http.get<GetEmployeeVM>(
      `${this.apiUrl}/api/employee/id=${employeeId}`, 
      { withCredentials: true }
    );
  }

  getEmployeesWithUserAccounts() {
    return this.http.get<GetEmployeeVM[]>(
      `${this.apiUrl}/api/employee/eligible`,
      { withCredentials: true }
    );
  }

  getEmployeesByDepartment(departmentId: number) {
    return this.http.get<GetEmployeeVM[]>(
      `${this.apiUrl}/api/employee/department=${departmentId}`,
      { withCredentials: true }
    );
  }

  getEmployeeManager(employeeId: number) {
    return this.http.get<GetEmployeeVM>(
      `${this.apiUrl}/api/employee/manager=${employeeId}`,
      { withCredentials: true }
    );
  }

  getEmployeeByJob(jobId: number) {
    return this.http.get<GetEmployeeVM[]>(
      `${this.apiUrl}/api/employee/job=${jobId}`,
      { withCredentials: true }
    );
  }

  createEmployee(employee: CreateEmployeeVM) {
    return this.http.post<GetEmployeeVM>(
      `${this.apiUrl}/api/employee/`,
      { employee },
      { withCredentials: true }
    );
  }

  updateEmployee(employeeId: number, employee: UpdateEmployeeVM) {
    return this.http.put(
      `${this.apiUrl}/api/employee/id=${employeeId}`,
      { employee },
      { withCredentials: true }
    );
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(
      `${this.apiUrl}/api/employee/id=${employeeId}`,
      { withCredentials: true }
    );
  }
}
