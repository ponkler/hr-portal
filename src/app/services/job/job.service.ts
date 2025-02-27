import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetJobVM } from '../../interfaces/jobs/get-job-vm';

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
}
