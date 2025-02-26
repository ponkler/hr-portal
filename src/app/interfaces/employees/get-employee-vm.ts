export interface GetEmployeeVM {
    employeeId: number;
    firstName: string | null;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    hireDate: Date;
    jobTitle: string;
    salary: number;
    managerFirstName: string | null;
    managerLastName: string | null;
    departmentName: string | null;
}
