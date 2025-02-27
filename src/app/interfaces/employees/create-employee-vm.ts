export interface CreateEmployeeVM {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    hireDate: Date;
    jobId: number;
    salary: number;
    managerId: number | null;
    departmentId: number | null;
}
