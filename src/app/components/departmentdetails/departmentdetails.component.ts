import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { LocationService } from '../../services/location/location.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-departmentdetails',
  imports: [],
  templateUrl: './departmentdetails.component.html',
  styleUrl: './departmentdetails.component.css'
})
export class DepartmentdetailsComponent {
  departmentService = inject(DepartmentService)
  locationService = inject(LocationService)
  employeeService = inject(EmployeeService)
}
