export interface GetDepartmentVM {
    departmentId: number;
    departmentName: string;
    locationStreetAddress: string | null;
    locationPostalCode: string | null;
    locationCity: string | null;
    locationStateProvince: string | null;
    countryName: string | null;
    regionName: string | null;
}
