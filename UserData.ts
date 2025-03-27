export interface UserData {
    name: string;
    passportNo: string;
    nationality: string;
    dateOfBirth: {
        year: string;
        month: string;
        day: string;
    };
    gender: string;
    passportExpiry: {
        year: string;
        month: string;
        day: string;
    };
    email: string;
    mobile: string;
    vesselNumber: string;
    travelMode: string;
    embarkation: string;
    accommodation: {
        stay: string;
        address: string;
        state: string;
        city: string;
        postcode: string;
    };
}