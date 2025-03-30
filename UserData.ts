export interface UserData {
    name: string;
    passportNo: string;
    nationality: 'CHN' | 'SGP' | 'USA' | 'MYS' | 'IND' | 'IDN' | 'PHL' | 'THA' | 'VNM' | 'AUS' | 'GBR' | 'CAN' | 'DEU' | 'FRA' | 'JPN' | 'KOR' | 'Other';
    dateOfBirth: {
        year: string;
        month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
        day: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
        | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
        | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30'
        | '31';
    };
    gender: '1' | '2'; // 1 for Male, 2 for Female
    passportExpiry: {
        year: string;
        month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
        day: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
        | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
        | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30'
        | '31';
    };
    email: string;
    mobile: string;
    vesselNumber: string;
    travelMode: '1' | '2' | '3'; //LAND for 2， SEA for 3, AIR for 1
    embarkation: 'CHN' | 'SGP' | 'USA' | 'MYS' | 'IND' | 'IDN' | 'PHL' | 'THA' | 'VNM' | 'AUS' | 'GBR' | 'CAN' | 'DEU' | 'FRA' | 'JPN' | 'KOR' | 'Other';
    accommodation: {
        stay: '1' | '2' | '99'; // 99 for other , 1 for hotel, 2 for residential
        address: string;
        state: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16';//JB is 01, 
        // city: string;//JB is 0100
        postcode: string; //  (must be five digits)
    };
}