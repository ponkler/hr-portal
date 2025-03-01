import { Component, inject, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { LocationService } from '../../services/location/location.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { GetDepartmentVM } from '../../interfaces/department/get-department-vm';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetLocationVM } from '../../interfaces/locations/get-location-vm';
import { GetEmployeeVM } from '../../interfaces/employees/get-employee-vm';
import { CommonModule } from '@angular/common';
import { UpdateDepartmentVM } from '../../interfaces/department/update-department-vm';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-departmentdetails',
  imports: [CommonModule],
  templateUrl: './departmentdetails.component.html',
  styleUrl: './departmentdetails.component.css'
})
export class DepartmentdetailsComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private departmentId: number | null = null;

  department: GetDepartmentVM | undefined;
  employees: GetEmployeeVM[] = [];

  updateDepartmentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    locationId: new FormControl(0, [
      Validators.required
    ])
  })

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departmentId = params['id'];
    })

    this.departmentService.getDepartmentById(this.departmentId!).subscribe({
      next: (response) => {
        this.department = response;
      },
      error: (err) => {
        console.error("Error fetching department:", err);
      }
    })
  }

  updateDepartment(departmentId: number) {
    const departmentName = this.updateDepartmentForm.get('name')?.value!;
    const locationId = this.updateDepartmentForm.get('locationId')?.value!;

    const department: UpdateDepartmentVM = {
      departmentName: departmentName,
      locationId: locationId
    };

    this.departmentService.updateDepartment(departmentId, department).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error("Error updating department:", err);
      }
    });
  }

  deleteDepartment(departmentId: number) {
    this.departmentService.deleteDepartment(departmentId).subscribe({
      next: () => {
        this.router.navigate(['/department/list']);
      },
      error: (err) => {
        console.error("Error deleting department:", err);
      }
    })
  }
}
