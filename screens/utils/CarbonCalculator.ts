// Saved carbon footprint = miles traveled * avg for transportation medium/person
// for this prototype, we will use two figures for two averages. One for public transport (MTA/Train/etc) 
// and another for car transport (own car/uber/etc). We'll assume walking/biking will be 0 CO2 emission.
// For public transit, you can get carbon estimate for miles from here: https://calculator.carbonfootprint.com/calculator.aspx?tab=6


export const Calculator = (kms: any, mode: string) => {
    const averages = {
        driving: 1, // Passenger Vehicle
        walking: 2,
        biking: 3,
        transit: 4
    }
    let calculationAverage: any;
    let miles: any;
    miles = kms / 1.609;
    switch(mode) {
        case 'transit':
            calculationAverage = averages.transit;
            break
        case 'driving':
            calculationAverage = averages.driving;
            break
        case 'biking':
            calculationAverage = averages.biking;
            break
        case 'walking':
            calculationAverage = averages.walking;
            break
    }

    console.log(miles * calculationAverage);
    return miles * calculationAverage;
}