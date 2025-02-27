import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { DepartmentService } from '../../services/department/department.service';
import { GetEmployeeVM } from '../../interfaces/employees/get-employee-vm';
import { JobService } from '../../services/job/job.service';
import { GetDepartmentVM } from '../../interfaces/department/get-department-vm';
import { GetJobVM } from '../../interfaces/jobs/get-job-vm';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CreateEmployeeVM } from '../../interfaces/employees/create-employee-vm';
import { UpdateEmployeeVM } from '../../interfaces/employees/update-employee-vm';

@Component({
  selector: 'app-employeetable',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.css'
})
export class EmployeetableComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private jobService = inject(JobService);
  private modalService = inject(NgbModal)
  private router = inject(Router);

  employees: GetEmployeeVM[] = [];
  sortedEmployees: GetEmployeeVM[] = [];
  departments: GetDepartmentVM[] = [];
  jobs: GetJobVM[] = [];

  selectedJob: any;

  deleteTarget: GetEmployeeVM | undefined;
  updateTarget: GetEmployeeVM | undefined;

  error: string | null = null;

  //============================================================================
  // Create Employee Form
  //============================================================================
  createEmployeeForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl(''),
    hireDate: new FormControl(new Date),
    jobId: new FormControl(0, [
      Validators.required
    ]),
    salary: new FormControl(0, [
      Validators.required
    ]),
    managerId: new FormControl(0),
    departmentId: new FormControl(0)
  });

  //============================================================================
  // Update Employee Form
  //============================================================================
  updateEmployeeForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl(''),
    hireDate: new FormControl(new Date),
    jobId: new FormControl(0),
    salary: new FormControl(0, [
      Validators.required
    ]),
    managerId: new FormControl(0),
    departmentId: new FormControl(0)
  })

  //============================================================================
  // Methods
  //============================================================================
  ngOnInit() {
    this.getData();
    this.createEmployeeForm.get('jobId')?.valueChanges.subscribe(value => {
      if (value) {
        this.selectedJob = this.jobs.find((job) => job.jobId == value);
        const min = this.selectedJob?.minSalary ? this.selectedJob?.minSalary : 1;
        const max = this.selectedJob?.maxSalary ? this.selectedJob?.maxSalary : 1;

        this.createEmployeeForm.get('salary')?.setValidators([
          Validators.required,
          Validators.min(min),
          Validators.max(max)
        ]);

        this.createEmployeeForm.get('salary')?.updateValueAndValidity({ onlySelf: true });
      }
    })

    this.updateEmployeeForm.get('jobId')?.valueChanges.subscribe(value => {
      if (value) {
        this.selectedJob = this.jobs.find((job) => job.jobId == value);
        const min = this.selectedJob?.minSalary ? this.selectedJob?.minSalary : 1;
        const max = this.selectedJob?.maxSalary ? this.selectedJob?.maxSalary : 1;

        this.createEmployeeForm.get('salary')?.setValidators([
          Validators.required,
          Validators.min(min),
          Validators.max(max)
        ]);

        this.createEmployeeForm.get('salary')?.updateValueAndValidity({ onlySelf: true });
      }
    })
  }

  getData() {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
        this.sortedEmployees = response.toSorted((a, b) => a.lastName.localeCompare(b.lastName));
      },
      error: (err) => {
        console.error("Error retrieving employees:")
      }
    });
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
      },
      error: (err) => {
        console.error("Error retrieving departments:", err);
      }
    });
    this.jobService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      },
      error: (err) => {
        console.error("Error retrieving jobs:", err)
      }
    });
  }

  openAdd(content: TemplateRef<any>) {
    this.error = null;
    this.createEmployeeForm.reset();
    this.createEmployeeForm.clearValidators();
    this.modalService.open(content, {size: 'lg'});
  }

  openEdit(content: TemplateRef<any>, employeeId: number) {
    this.error = null;

    this.updateEmployeeForm.reset();
    this.updateEmployeeForm.clearValidators();

    this.updateTarget = this.employees.find((employee) => employee.employeeId == employeeId);

    const departmentId = this.departments.find((department) =>
      department.departmentName == this.updateTarget?.departmentName)
      ?.departmentId;

    const jobId = this.jobs.find((job) =>
      job.jobTitle == this.updateTarget?.jobTitle)
      ?.jobId;

    const managerId = this.employees.find((employee) =>
      employee.firstName == this.updateTarget?.managerFirstName
      && employee.lastName == this.updateTarget?.managerLastName)
      ?.employeeId;

    this.updateEmployeeForm.controls['firstName'].setValue(this.updateTarget?.firstName!, { onlySelf: true })
    this.updateEmployeeForm.controls['lastName'].setValue(this.updateTarget?.lastName!, { onlySelf: true })
    this.updateEmployeeForm.controls['email'].setValue(this.updateTarget?.email!, { onlySelf: true })
    this.updateEmployeeForm.controls['phoneNumber'].setValue(this.updateTarget?.phoneNumber!, { onlySelf: true })
    this.updateEmployeeForm.controls['hireDate'].setValue(this.updateTarget?.hireDate!, { onlySelf: true })
    this.updateEmployeeForm.controls['jobId'].setValue(jobId!, { onlySelf: true })
    this.updateEmployeeForm.controls['salary'].setValue(this.updateTarget?.salary!, { onlySelf: true })
    this.updateEmployeeForm.controls['managerId'].setValue(managerId!, { onlySelf: true })
    this.updateEmployeeForm.controls['departmentId'].setValue(departmentId!, { onlySelf: true })

    this.modalService.open(content, {size: 'lg'});
  }

  openDelete(content: TemplateRef<any>, employeeId: number) {
    this.deleteTarget = this.employees.find((employee) =>
      employee.employeeId == employeeId);

    this.modalService.open(content);
  }

  createEmployee() {
    const firstName = this.createEmployeeForm.value['firstName'];
    const lastName = this.createEmployeeForm.value['lastName'];
    const email = this.createEmployeeForm.value['email'];
    const phoneNumber = this.createEmployeeForm.value['phoneNumber'];
    const hireDate = this.createEmployeeForm.value['hireDate'];
    const jobId = Number(this.createEmployeeForm.value['jobId']);
    const salary = this.createEmployeeForm.value['salary'];
    const managerId = Number(this.createEmployeeForm.value['managerId']);
    const departmentId = Number(this.createEmployeeForm.value['departmentId']);

    const employee: CreateEmployeeVM = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      phoneNumber: phoneNumber!,
      hireDate: hireDate!,
      jobId: jobId!,
      salary: salary!,
      managerId: managerId!,
      departmentId: departmentId!
    }

    if (this.createEmployeeForm.valid) {
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error("Error creating employee:", err);
        }
      })
    } else {
      this.error = "There was an issue with your submission. Please try again."
    }
  }

  updateEmployee(employeeId: number) {
    const firstName = this.updateEmployeeForm.value['firstName'];
    const lastName = this.updateEmployeeForm.value['lastName'];
    const email = this.updateEmployeeForm.value['email'];
    const phoneNumber = this.updateEmployeeForm.value['phoneNumber'];
    const hireDate = this.updateEmployeeForm.value['hireDate'];
    const jobId = Number(this.updateEmployeeForm.value['jobId']);
    const salary = this.updateEmployeeForm.value['salary'];
    const managerId = Number(this.updateEmployeeForm.value['managerId']);
    const departmentId = Number(this.updateEmployeeForm.value['departmentId']);

    const employee: UpdateEmployeeVM = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      phoneNumber: phoneNumber!,
      hireDate: hireDate!,
      jobId: jobId!,
      salary: salary!,
      managerId: managerId!,
      departmentId: departmentId!
    }

    if (this.updateEmployeeForm.valid) {
      this.employeeService.updateEmployee(employeeId, employee).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error("Error updating employee:", err);
        }
      })
    } else {
      this.error = "There was an issue with your submission. Please try again."
    }
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.deleteTarget = undefined;
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting employee:", err);
      }
    })
  }

  redirectToDetails(employeeId: number) {
    this.router.navigate([`/employee/${employeeId}`]);
  }

  //============================================================================
  // Getters for FormControls
  //============================================================================
  get createFirstName() {
    return this.createEmployeeForm.get('firstName');
  }

  get createLastName() {
    return this.createEmployeeForm.get('lastName');
  }

  get createEmail() {
    return this.createEmployeeForm.get('email');
  }

  get createPhoneNumber() {
    return this.createEmployeeForm.get('phoneNumber');
  }

  get createHireDate() {
    return this.createEmployeeForm.get('hireDate');
  }

  get createJobId() {
    return this.createEmployeeForm.get('jobId');
  }

  get createSalary() {
    return this.createEmployeeForm.get('salary');
  }

  get createManagerId() {
    return this.createEmployeeForm.get('managerId');
  }

  get createDepartmentId() {
    return this.createEmployeeForm.get('departmentId');
  }

  //============================================================================

  get updateFirstName() {
    return this.updateEmployeeForm.get('firstName');
  }

  get updateLastName() {
    return this.updateEmployeeForm.get('lastName');
  }

  get updateEmail() {
    return this.updateEmployeeForm.get('email');
  }

  get updatePhoneNumber() {
    return this.updateEmployeeForm.get('phoneNumber');
  }

  get updateHireDate() {
    return this.updateEmployeeForm.get('hireDate');
  }

  get updateJobId() {
    return this.updateEmployeeForm.get('jobId');
  }

  get updateSalary() {
    return this.updateEmployeeForm.get('salary');
  }

  get updateManagerId() {
    return this.updateEmployeeForm.get('managerId');
  }

  get updateDepartmentId() {
    return this.updateEmployeeForm.get('departmentId');
  }
}
