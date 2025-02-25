import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { GetDepartmentVM } from '../../interfaces/department/get-department-vm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../services/location/location.service';
import { GetLocationVM } from '../../interfaces/locations/get-location-vm';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departmenttable',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './departmenttable.component.html',
  styleUrl: './departmenttable.component.css'
})
export class DepartmenttableComponent implements OnInit{
  departmentService = inject(DepartmentService)
  locationService = inject(LocationService)
  router = inject(Router);
  departments: GetDepartmentVM[] = [];
  locations: GetLocationVM[] = [];
  deleteTarget: GetDepartmentVM | undefined;
  updateTarget: GetDepartmentVM | undefined;
  error: string | null = null;

  createDepartmentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    locationId: new FormControl(0, [
      Validators.required
    ])
  });

  updateDepartmentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    locationId: new FormControl(0, [
      Validators.required
    ])
  })

  private modalService = inject(NgbModal)

  openAdd(content: TemplateRef<any>) {
    this.error = null;
    this.createDepartmentForm.reset();
    this.createDepartmentForm.clearValidators();
    this.modalService.open(content, { size: 'lg' });
  }

  openEdit(content: TemplateRef<any>, departmentId: number) {
    this.error = null;

    this.updateDepartmentForm.reset();
    this.updateDepartmentForm.clearValidators();

    this.updateTarget = this.departments.find((department) => department.departmentId == departmentId);

    const locationId = this.locations.find((location) => location.streetAddress == this.updateTarget?.locationStreetAddress)?.locationId!;

    this.updateDepartmentForm.controls['name'].setValue(this.updateTarget?.departmentName!, { onlySelf: true });
    this.updateDepartmentForm.controls['locationId'].setValue(locationId, { onlySelf: true });

    this.modalService.open(content, { size: 'lg' });
  }

  openDelete(content: TemplateRef<any>, departmentId: number) {
    this.modalService.open(content);
    this.deleteTarget = this.departments.find((department) => department.departmentId == departmentId);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.departmentService.getDepartments().subscribe({
      next: (result: GetDepartmentVM[]) => {
        this.departments = result;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
    this.locationService.getLocations().subscribe({
      next: (result: GetLocationVM[]) => {
        this.locations = result;
      },
      error: (err) => {
        console.error('Error fetching locations:', err);
      }
    });
  }

  createDepartment() {
    const name = this.createDepartmentForm.value["name"]!;
    const locationId = this.createDepartmentForm.value["locationId"]!;

    if (this.createDepartmentForm.valid) {
      this.departmentService.addDepartment(name, locationId).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error("Error creating department:", err);
        }
      });
    } else {
      this.error = "There was an issue with your submission. Please try again.";
    }
  }

  deleteDepartment(departmentId : number) {
    this.departmentService.deleteDepartment(departmentId).subscribe({
      next: () => {
        this.deleteTarget = undefined;
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting department:", err);
      } 
    });
  }

  updateDepartment(departmentId: number) {
    const name = this.updateDepartmentForm.value["name"]!;
    const locationId = this.updateDepartmentForm.value["locationId"]!;

    if (this.updateDepartmentForm.valid) {
      this.departmentService.updateDepartment(departmentId, name, locationId).subscribe({
        next: () => {
          this.updateTarget = undefined;
          window.location.reload();
        },
        error: (err) => {
          console.error("Error updating depratment:", err);
        }
      });
    } else {
      this.error = "There was an issue with your submission. Please try again.";
    }
  }

  redirectToDetails(departmentId: number) {
    this.router.navigate([`/department/${departmentId}`]);
  }

  get createName() {
    return this.createDepartmentForm.get('name');
  }

  get createLocationId() {
    return this.createDepartmentForm.get('locationId');
  }

  get updateName() {
    return this.updateDepartmentForm.get('name');
  }

  get updateLocationId() {
    return this.updateDepartmentForm.get('locationId');
  }
}