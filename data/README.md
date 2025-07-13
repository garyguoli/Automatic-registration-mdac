# User Data Files

This directory contains user profile data files for the Malaysia Digital Arrival Card auto-filler.

## Adding Your Profile

1. Create a new TypeScript file in this directory (e.g., `your-name.ts`)
2. Follow the template below:

```typescript
import { UserData } from "../UserData.js";

export const userData: UserData = {
    name: "YOUR FULL NAME",
    passportNo: "YOUR_PASSPORT_NUMBER",
    nationality: "YOUR_NATIONALITY_CODE", // e.g., "USA", "CHN", "SGP"
    dateOfBirth: {
        year: "1990",
        month: "Jan", // Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
        day: "15"
    },
    gender: "1", // 1 for Male, 2 for Female
    passportExpiry: {
        year: "2030",
        month: "Dec",
        day: "31"
    },
    email: "your.email@example.com",
    RegionCode: "1", // Mobile region code (1 for USA, 86 for China, 65 for Singapore)
    mobile: "5551234567",
    vesselNumber: "ABC123",
    travelMode: "1", // 1 for AIR, 2 for LAND, 3 for SEA
    embarkation: "USA", // Departure location code
    accommodation: {
        stay: "1", // 1 for hotel, 2 for residential, 99 for other
        address: "123 Hotel Street, City Center",
        state: "01", // Malaysian state code (01 for Johor)
        postcode: "12345"
    }
};
```

## Important Notes

- **Privacy**: Your data files will NOT be committed to git
- **Security**: Keep your personal information secure
- **Validation**: Ensure all information is accurate before use
- **Backup**: Keep a backup of your data files separately

## Common Values

### Nationality Codes
- USA: United States
- CHN: China
- SGP: Singapore
- MYS: Malaysia
- GBR: United Kingdom
- AUS: Australia

### Travel Modes
- 1: Air travel
- 2: Land travel
- 3: Sea travel

### Accommodation Types
- 1: Hotel
- 2: Residential
- 99: Other

### Malaysian State Codes
- 01: Johor
- 02: Kedah
- 03: Kelantan
- 04: Melaka
- 05: Negeri Sembilan
- 06: Pahang
- 07: Pulau Pinang
- 08: Perak
- 09: Perlis
- 10: Selangor
- 11: Terengganu
- 12: Sabah
- 13: Sarawak
- 14: Wilayah Persekutuan Kuala Lumpur
- 15: Wilayah Persekutuan Labuan
- 16: Wilayah Persekutuan Putrajaya 