export interface GetLocationVM {
    locationId: number;
    streetAddress: string | null;
    postalCode: string | null;
    city: string;
    stateProvince: string | null;
    countryName: string;
    regionName: string | null;
}
