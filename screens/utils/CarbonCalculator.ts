// Carbon averages based on data from:
// https://www.transit.dot.gov/sites/fta.dot.gov/files/docs/PublicTransportationsRoleInRespondingToClimateChange2010.pdf
// https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
// https://en.wikipedia.org/wiki/Carbon_footprint#Passenger_transport

// Calculate carbon footprint saving & potential savings(driving)
export const Calculator = (kms: number, mode: string) => {
    const averages = {
        driving: 0.96, // Passenger Vehicle
        transit: 0.31,
    };
    let calculationAverage: any;
    let miles: number;
    miles = kms / 1.609;
    switch(mode) {
        case 'transit':
            calculationAverage = averages.driving - averages.transit;
            break
        case 'driving':
            calculationAverage = averages.driving - averages.transit;   // What user could save if they don't drive
            break
        case 'bicycling':
            calculationAverage = averages.driving;
            break
        case 'walking':
            calculationAverage = averages.driving
            break
    }

    return Math.round(miles * calculationAverage).toFixed(2);
}