import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetJobVM } from '../../interfaces/jobs/get-job-vm';
import { UpdateJobVM } from '../../interfaces/jobs/update-job-vm';
import { CreateJobVM } from '../../interfaces/jobs/create-job-vm';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getJobs() {
    return this.http.get<GetJobVM[]>(
      `${this.apiUrl}/api/job`,
      { withCredentials: true }
    );
  }

  getJobById(jobId: number) {
    return this.http.get<GetJobVM>(
      `${this.apiUrl}/api/job/id=${jobId}`,
      { withCredentials: true }
    );
  }

  createJob(job: CreateJobVM) {
    return this.http.post(`${this.apiUrl}/api/job`, 
      {
        jobTitle: job.jobTitle,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary
      },
      { withCredentials: true }
    );
  }

  updateJob(jobId: number, job: UpdateJobVM) {
    return this.http.put(`${this.apiUrl}/api/job/id=${jobId}`, 
      {
        jobTitle: job.jobTitle,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary
      },
      { withCredentials: true }
    );
  }

  deleteJob(jobId: number) {
    return this.http.delete(`${this.apiUrl}/api/job/id=${jobId}`, 
      { withCredentials: true }
    );
  }
}
