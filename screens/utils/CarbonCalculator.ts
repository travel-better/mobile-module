// Saved carbon footprint = miles traveled * avg for transportation medium/person
// for this prototype, we will use two figures for two averages. One for public transport (MTA/Train/etc) 
// and another for car transport (own car/uber/etc). We'll assume walking/biking will be 0 CO2 emission.
// For public transit, you can get carbon estimate for miles from here: https://calculator.carbonfootprint.com/calculator.aspx?tab=6


export const Calculator = (miles: any, medium: any) => {
    let average = 0;
    return miles * average;
}