import { Component, inject, TemplateRef } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetJobVM } from '../../interfaces/jobs/get-job-vm';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, max, Observable, zip } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateJobVM } from '../../interfaces/jobs/create-job-vm';

@Component({
  selector: 'app-jobtable',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './jobtable.component.html',
  styleUrl: './jobtable.component.css'
})
export class JobtableComponent {
  private jobService = inject(JobService);
  private router = inject(Router);
  private modalService = inject(NgbModal);

  jobs: GetJobVM[] = [];

  deleteTarget: GetJobVM | undefined;
  updateTarget: GetJobVM | undefined;

  error: string | null = null;

  createJobForm = new FormGroup({
    jobTitle: new FormControl('', [
      Validators.required
    ]),
    minSalary: new FormControl(0),
    maxSalary: new FormControl(0)
  })

  updateJobForm = new FormGroup({
    jobTitle: new FormControl('', [
      Validators.required
    ]),
    minSalary: new FormControl(0),
    maxSalary: new FormControl(0)
  })

  ngOnInit() {
    this.getData();
    // When minimum salary field is updated, set maximum validator to value of 
    // maximum salary, or safe integer limit if max salary does not exist
    this.createJobForm.get('minSalary')?.valueChanges.subscribe(value => {
      const maxSalaryControl = this.createJobForm.get('maxSalary');
      if (maxSalaryControl) {
        maxSalaryControl.setValidators([
          Validators.required,
          Validators.min(value || 0)
        ]);
        maxSalaryControl.updateValueAndValidity({emitEvent: false});
      }
    });

    // When maximum salary field is updated, set minimum validator to value of 
    // minimum salary, or 0 if min salary does not exist
    this.createJobForm.get('maxSalary')?.valueChanges.subscribe(value => {
      const minSalaryControl = this.createJobForm.get('minSalary');
      if (minSalaryControl) {
        minSalaryControl.setValidators([
          Validators.required,
          Validators.max(value || Number.MAX_SAFE_INTEGER)
        ]);
        minSalaryControl.updateValueAndValidity({emitEvent: false});
      }
    });

    // When minimum salary field is updated, set maximum validator to value of 
    // maximum salary, or safe integer limit if max salary does not exist
    this.updateJobForm.get('minSalary')?.valueChanges.subscribe(value => {
      const maxSalaryControl = this.updateJobForm.get('maxSalary');
      if (maxSalaryControl) {
        maxSalaryControl.setValidators([
          Validators.required,
          Validators.min(value || 0)
        ]);
        maxSalaryControl.updateValueAndValidity({emitEvent: false});
      }
    });

    // When maximum salary field is updated, set minimum validator to value of 
    // minimum salary, or 0 if min salary does not exist
    this.updateJobForm.get('maxSalary')?.valueChanges.subscribe(value => {
      const minSalaryControl = this.updateJobForm.get('minSalary');
      if (minSalaryControl) {
        minSalaryControl.setValidators([
          Validators.required,
          Validators.max(value || Number.MAX_SAFE_INTEGER)
        ]);
        minSalaryControl.updateValueAndValidity({emitEvent: false});
      }
    });
  }

  getData() {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response;
      },
      error: (err) => {
        console.error("Error fetching jobs:", err);
      }
    })
  }

  openAdd(content: TemplateRef<any>) {
    this.error = null;
    this.createJobForm.reset();
    this.createJobForm.clearValidators();
    this.modalService.open(content, { size: 'lg' });
  }

  openEdit(content: TemplateRef<any>, jobId: number) {
    this.error = null;

    this.updateJobForm.reset();
    this.updateJobForm.clearValidators();

    this.updateTarget = this.jobs.find((job) => job.jobId == jobId);

    this.updateJobForm.get('jobTitle')?.setValue(this.updateTarget?.jobTitle!, { onlySelf: true });
    this.updateJobForm.get('minSalary')?.setValue(this.updateTarget?.minSalary!, { onlySelf: true });
    this.updateJobForm.get('maxSalary')?.setValue(this.updateTarget?.maxSalary!, { onlySelf: true });

    this.modalService.open(content, { size: 'lg' });
  }

  openDelete(content: TemplateRef<any>, jobId: number) {
    this.deleteTarget = this.jobs.find((job) => job.jobId == jobId);
    this.modalService.open(content);
  }

  createJob() {
    const jobTitle = this.createJobForm.get('jobTitle')?.value!;
    const minSalary = this.createJobForm.get('minSalary')?.value!;
    const maxSalary = this.createJobForm.get('maxSalary')?.value!;

    const job: CreateJobVM = {
      jobTitle: jobTitle,
      minSalary: minSalary,
      maxSalary: maxSalary
    };

    if (this.createJobForm.valid) {
      this.jobService.createJob(job).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error("Error creating job:", err);
        }
      });
    }
  }

  deleteJob(jobId: number) {
    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting job:", err);
      }
    });
  }

  updateJob(jobId: number) {
    const jobTitle = this.updateJobForm.get('jobTitle')?.value!;
    const minSalary = this.updateJobForm.get('minSalary')?.value!;
    const maxSalary = this.updateJobForm.get('maxSalary')?.value!;

    const job: CreateJobVM = {
      jobTitle: jobTitle,
      minSalary: minSalary,
      maxSalary: maxSalary
    };
    this.jobService.updateJob(jobId, job).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting job:", err);
      }
    })
  }

  redirectToDetails(jobId: number) {
    this.router.navigate([`/job/${jobId}`]);
  }

  get createTitle() {
    return this.createJobForm.get('jobTitle');
  }

  get createMinSalary() {
    return this.createJobForm.get('minSalary');
  }

  get createMaxSalary() {
    return this.createJobForm.get('maxSalary');
  }

  get updateTitle() {
    return this.updateJobForm.get('jobTitle');
  }

  get updateMinSalary() {
    return this.updateJobForm.get('minSalary');
  }

  get updateMaxSalary() {
    return this.updateJobForm.get('maxSalary');
  }
}
