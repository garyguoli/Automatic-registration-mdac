# Automatic-registration-mdac

npx playwright codegen 'https://imigresen-online.imi.gov.my/mdac/main'

this data.ts file

import { UserData } from "./UserData.js";

export const userData: UserData = {
  name: "",
  passportNo: "",
  nationality: "",
  dateOfBirth: {
    year: "",
    month: "",
    day: ""
  },
  gender: "",
  passportExpiry: {
    year: "",
    month: "",
    day: ""
  },
  email: "",
  mobile: "",

  vesselNumber: "",
  travelMode: "",
  embarkation: "",
  accommodation: {
    stay: "",
    address: "",
    state: "",
    city: "",
    postcode: ""
  }
};
