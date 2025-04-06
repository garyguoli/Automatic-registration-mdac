# Automatic-registration-mdac

Automatic tool for filling out the Malaysia Digital Arrival Card (MDAC). This tool helps you automatically complete the Malaysia entry card form, saving you time from manual entry.

## Features

- Automatically fills in all required form fields
- Supports custom user information
- Automatically calculates arrival and departure dates
- Uses Playwright for reliable automation
- Supports manual verification and form submission

## System Requirements

- Node.js 16 or higher
- npm 7 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/garyguoli/Automatic-registration-mdac.git
cd Automatic-registration-mdac
```

2. Install dependencies:
```bash
npm install, yarn add, pnpm i
```

## Configuration

Configure your personal information in the `data.ts` file:

```typescript

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
        postcode: ""
    }
};

```

## Usage

1. Start the automatic form filling program:
```bash
npm start
```

2. The program will automatically:
   - Open a browser
   - Navigate to the Malaysia Digital Arrival Card website
   - Fill in all form fields
   - Wait for you to manually check and submit

3. Check and submit:
   - Verify all information is correct
   - Complete any additional verification steps manually
   - Submit the form

## Important Notes

- Ensure all information entered is accurate and correct
- It's recommended to carefully review all information before submission
- If you encounter a CAPTCHA, you'll need to enter it manually
- Ensure a stable internet connection

## Development

Use Playwright's code generator to generate new selectors:
```bash
npx playwright codegen 'https://imigresen-online.imi.gov.my/mdac/main'
```

## License

ISC License

## Contributions

Issues and Pull Requests are welcome to help improve this project.

## Disclaimer

This tool is for educational and reference purposes only. When using this tool, please comply with the relevant regulations and policies of the Malaysian Immigration Department.

